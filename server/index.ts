import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractDocumentContent } from './services/documentExtractor.js';
import { 
  analyzeDocumentWithAI, 
  askDocumentQuestion, 
  compareDocuments,
  generateCounselPrepSheet 
} from './services/aiService.js';
import { SAMPLE_DOCUMENTS } from '../shared/sampleDocs.js';
import { UserContext, DocumentAnalysis } from '../shared/types.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting in-memory store
const ipRequestStore = new Map<string, { count: number; resetTime: number }>();
function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const record = ipRequestStore.get(clientIp);

  if (!record || now > record.resetTime) {
    ipRequestStore.set(clientIp, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= 120) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  record.count += 1;
  next();
}

// Security & Middleware
app.use(rateLimiter);
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper to sanitize filenames against path traversal or script injection
function sanitizeFilename(originalName: string): string {
  if (!originalName) return 'document.txt';
  const basename = path.basename(originalName).replace(/[^\w\.\-\s]/gi, '_');
  return basename.substring(0, 100) || 'document.txt';
}

// In-Memory Document Cache (Privacy focused: No persistent disk storage of sensitive docs)
const documentStore = new Map<string, DocumentAnalysis>();

// Multer in-memory upload storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.docx', '.doc', '.txt'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type '${ext}'. Please upload a PDF, DOCX, or TXT file.`));
    }
  },
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'LegalBridge | न्यायसेतु Legal Assistance API', timestamp: new Date().toISOString() });
});

// Sample Documents endpoint
app.get('/api/sample-documents', (_req: Request, res: Response) => {
  res.json({ samples: SAMPLE_DOCUMENTS });
});

// Upload document endpoint
app.post('/api/documents/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if sample document ID was provided
    const sampleId = req.body.sampleId;
    if (sampleId) {
      const sample = SAMPLE_DOCUMENTS.find(s => s.id === sampleId);
      if (!sample) {
        return res.status(404).json({ error: 'Sample document not found' });
      }
      const rawText = req.body.useV2 && sample.v2Content ? sample.v2Content : sample.content;
      const lines = rawText.split('\n').map((content, idx) => ({ lineNumber: idx + 1, content: content.trimEnd() }));
      return res.json({
        text: rawText,
        lines,
        fileName: `${sample.title}.txt`,
        fileType: 'txt',
        fileSize: rawText.length
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No document file was provided.' });
    }

    const safeName = sanitizeFilename(req.file.originalname);
    const extracted = await extractDocumentContent(req.file.buffer, safeName);
    res.json({
      text: extracted.text,
      lines: extracted.lines,
      fileName: safeName,
      fileType: extracted.fileType,
      fileSize: req.file.size
    });
  } catch (err) {
    next(err);
  }
});

// Analyze document endpoint
app.post('/api/documents/analyze', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, lines, fileName, fileType, fileSize, userContext } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Valid document text is required for analysis.' });
    }

    const context: UserContext = userContext || 'none';
    const analysis = await analyzeDocumentWithAI(
      text,
      lines || text.split('\n').map((c: string, i: number) => ({ lineNumber: i + 1, content: c })),
      fileName || 'Document.txt',
      fileType || 'txt',
      fileSize || text.length,
      context
    );

    documentStore.set(analysis.id, analysis);
    res.json(analysis);
  } catch (err) {
    next(err);
  }
});

// Q&A endpoint
app.post('/api/documents/qa', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { analysis, question } = req.body;
    if (!analysis || !question) {
      return res.status(400).json({ error: 'Both document analysis object and question are required.' });
    }

    const qaResult = await askDocumentQuestion(analysis, question);
    res.json(qaResult);
  } catch (err) {
    next(err);
  }
});

// Document comparison endpoint
app.post('/api/documents/compare', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { docA, docB } = req.body;
    if (!docA || !docB) {
      return res.status(400).json({ error: 'Both Document A and Document B analysis objects are required for comparison.' });
    }

    const comparison = await compareDocuments(docA, docB);
    res.json(comparison);
  } catch (err) {
    next(err);
  }
});

// Prep sheet endpoint
app.post('/api/documents/prep-sheet', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { analysis } = req.body;
    if (!analysis) {
      return res.status(400).json({ error: 'Document analysis object is required to generate prep sheet.' });
    }

    const prepSheet = generateCounselPrepSheet(analysis);
    res.json(prepSheet);
  } catch (err) {
    next(err);
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../dist');
  app.use(express.static(clientDist));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global Human-Readable Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Document processing error',
    message: err.message || 'We could not process your document request right now. Please verify your file and try again.'
  });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`⚖️ LegalBridge | न्यायसेतु API Server running on port ${PORT}`);
  });
}

export default app;
