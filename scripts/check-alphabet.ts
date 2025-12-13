import fs from 'fs';
import path from 'path';

const dictPath = path.join(process.cwd(), 'public', 'dictionary.txt');
const content = fs.readFileSync(dictPath, 'utf-8');
const words = content.split('\n').filter(Boolean);

const letters = new Set<string>();
for (const word of words) {
    for (const char of word) {
        if (/[a-zA-Z]/.test(char)) {
            letters.add(char.toUpperCase());
        }
    }
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const missing = alphabet.filter(char => !letters.has(char));

if (missing.length === 0) {
    console.log('Yes, all letters A-Z are present in the dictionary.');
} else {
    console.log(`No, the following letters are missing: ${missing.join(', ')}`);
}
