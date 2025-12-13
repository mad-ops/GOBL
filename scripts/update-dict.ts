import fs from 'fs';
import path from 'path';
import https from 'https';

const URL = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt';
const TARGET_PATH = path.join(process.cwd(), 'public', 'dictionary.txt');
const TOP_N = 1000;

console.log(`Fetching from ${URL}...`);

https.get(URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Download complete. Processing...');

        const allWords = data.split('\n').map(w => w.trim());
        const fiveLetterWords = allWords.filter(w => /^[a-zA-Z]{5}$/.test(w));

        console.log(`Found ${fiveLetterWords.length} 5-letter words total.`);

        const topWords = fiveLetterWords.slice(0, TOP_N).map(w => w.toUpperCase());

        if (topWords.length < TOP_N) {
            console.warn(`Warning: Only found ${topWords.length} words, fewer than requested ${TOP_N}.`);
        } else {
            console.log(`Selected top ${topWords.length} most common 5-letter words.`);
        }

        fs.writeFileSync(TARGET_PATH, topWords.join('\n'));
        console.log(`Wrote to ${TARGET_PATH}`);
    });

}).on('error', (err) => {
    console.error('Error fetching dictionary:', err);
    process.exit(1);
});
