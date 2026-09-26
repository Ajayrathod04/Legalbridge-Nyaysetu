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
  if (!buffer || buffer.length === 0) {
    throw new Error('The uploaded document is empty or 0 bytes.');
  }

  if (buffer.length > 10 * 1024 * 1024) {
    throw new Error('File exceeds the maximum allowable limit of 10 MB.');
  }

  // Detect Executable Headers (MZ for PE, \x7fELF for Linux binaries)
  if (buffer.length >= 2 && buffer[0] === 0x4d && buffer[1] === 0x5a) {
    throw new Error('Security Violation: Executable binary files are not allowed.');
  }
  if (buffer.length >= 4 && buffer[0] === 0x7f && buffer[1] === 0x45 && buffer[2] === 0x4c && buffer[3] === 0x46) {
    throw new Error('Security Violation: Executable ELF files are not allowed.');
  }

  const extension = filename.split('.').pop()?.toLowerCase() || '';
  let rawText = '';
  let fileType: 'pdf' | 'docx' | 'txt' = 'txt';

  if (extension === 'pdf') {
    fileType = 'pdf';
    // Magic Byte Check for PDF: Starts with %PDF- (0x25, 0x50, 0x44, 0x46, 0x2D)
    const isPdfMagic = buffer.length >= 5 &&
      buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46 && buffer[4] === 0x2D;
    
    if (!isPdfMagic) {
      throw new Error("File content validation failed. The file extension is '.pdf' but the file header signature does not match a valid PDF document.");
    }

    try {
      const data = await pdfParse(buffer);
      rawText = data.text;
    } catch (err) {
      throw new Error(`Failed to extract text from PDF document: ${(err as Error).message}`);
    }
  } else if (extension === 'docx' || extension === 'doc') {
    fileType = 'docx';
    // Magic Byte Check for DOCX: Zip format starts with PK\x03\x04 (0x50, 0x4B, 0x03, 0x04)
    const isDocxMagic = buffer.length >= 4 &&
      buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;

    if (!isDocxMagic && extension === 'docx') {
      throw new Error("File content validation failed. The file extension is '.docx' but the binary header does not match a valid Office Open XML document.");
    }

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
