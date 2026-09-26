import { describe, it, expect } from 'vitest';
import { extractDocumentContent } from '../server/services/documentExtractor.js';

describe('Document Extractor & Validation Security Engine', () => {
  it('should parse valid plain text documents into line mapped structures', async () => {
    const sampleText = "LINE 1: Residential Lease Agreement\nLINE 2: Rent payable on 1st of every month.\nLINE 3: Deposit is non-refundable.";
    const buffer = Buffer.from(sampleText, 'utf-8');

    const result = await extractDocumentContent(buffer, 'lease.txt');
    expect(result.fileType).toBe('txt');
    expect(result.charCount).toBe(sampleText.length);
    expect(result.lines.length).toBe(3);
    expect(result.lines[0]).toEqual({ lineNumber: 1, content: 'LINE 1: Residential Lease Agreement' });
    expect(result.lines[1]).toEqual({ lineNumber: 2, content: 'LINE 2: Rent payable on 1st of every month.' });
  });

  it('should reject empty or 0-byte document buffers', async () => {
    const emptyBuffer = Buffer.from('', 'utf-8');
    await expect(extractDocumentContent(emptyBuffer, 'empty.txt'))
      .rejects.toThrow('empty');
  });

  it('should reject files exceeding 10 MB limit', async () => {
    // 10MB + 10 bytes buffer
    const oversizedBuffer = Buffer.alloc(10 * 1024 * 1024 + 10);
    await expect(extractDocumentContent(oversizedBuffer, 'huge.txt'))
      .rejects.toThrow('exceeds');
  });

  it('should detect invalid magic byte headers for fake PDF extension', async () => {
    // Fake PDF containing plain text without %PDF- magic bytes
    const fakePdfBuffer = Buffer.from('NOT A REAL PDF CONTENT HERE', 'utf-8');
    await expect(extractDocumentContent(fakePdfBuffer, 'fake.pdf'))
      .rejects.toThrow('header signature does not match');
  });

  it('should detect invalid magic byte headers for fake DOCX extension', async () => {
    // Fake DOCX containing plain text without PK\x03\x04 Zip magic bytes
    const fakeDocxBuffer = Buffer.from('NOT A REAL DOCX ZIP ARCHIVE', 'utf-8');
    await expect(extractDocumentContent(fakeDocxBuffer, 'fake.docx'))
      .rejects.toThrow('binary header does not match');
  });

  it('should reject executable PE binary files (MZ header)', async () => {
    const exeBuffer = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00]);
    await expect(extractDocumentContent(exeBuffer, 'malicious.exe'))
      .rejects.toThrow('Executable binary files are not allowed');
  });

  it('should reject Linux ELF binary files (\\x7fELF header)', async () => {
    const elfBuffer = Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0x01, 0x01]);
    await expect(extractDocumentContent(elfBuffer, 'malicious.elf'))
      .rejects.toThrow('Executable ELF files are not allowed');
  });

  it('should reject unsupported file extensions', async () => {
    const buffer = Buffer.from('random data', 'utf-8');
    await expect(extractDocumentContent(buffer, 'script.sh'))
      .rejects.toThrow('Unsupported file format');
  });
});
