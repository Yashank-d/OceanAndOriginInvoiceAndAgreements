import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the compiled or source document
// Since we have vite and typescript, we can dynamically build or use a standalone script
console.log('Testing ReactPDF engine in Node...');
