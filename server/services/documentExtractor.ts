import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export interface ExtractedDocument {
  text: string;
  lines: { lineNumber: number; content: string }[];
  fileType: 'pdf' | 'docx' | 'txt';
  charCount: number;
}

export async function extractDocumentContent(
  buffer: Buffer,
  filename: string
): Promise<ExtractedDocument> {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  let rawText = '';
  let fileType: 'pdf' | 'docx' | 'txt' = 'txt';

  if (extension === 'pdf') {
    fileType = 'pdf';
    try {
      const data = await pdfParse(buffer);
      rawText = data.text;
    } catch (err) {
      throw new Error(`Failed to extract text from PDF document: ${(err as Error).message}`);
    }
  } else if (extension === 'docx' || extension === 'doc') {
    fileType = 'docx';
    try {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } catch (err) {
      throw new Error(`Failed to extract text from DOCX document: ${(err as Error).message}`);
    }
  } else if (extension === 'txt' || extension === 'md' || extension === 'rtf') {
    fileType = 'txt';
    rawText = buffer.toString('utf-8');
  } else {
    throw new Error(`Unsupported file format '.${extension}'. Please upload a PDF, DOCX, or TXT file.`);
  }

  // Clean and map lines
  const cleanText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (!cleanText.trim()) {
    throw new Error('The uploaded document is empty or contains no readable text.');
  }

  const rawLines = cleanText.split('\n');
  const lines = rawLines.map((content, idx) => ({
    lineNumber: idx + 1,
    content: content.trimEnd(),
  }));

  return {
    text: cleanText,
    lines,
    fileType,
    charCount: cleanText.length,
  };
}
