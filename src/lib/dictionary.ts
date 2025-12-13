export const loadDictionary = async (): Promise<Set<string>> => {
    try {
        const response = await fetch('/dictionary.txt');
        const text = await response.text();
        const words = text.split(/\r?\n/).map(w => w.trim().toUpperCase()).filter(w => w.length === 5 && /^[A-Z]{5}$/.test(w));
        console.log(`Dictionary loaded: ${words.length} words`);
        return new Set(words);
    } catch (e) {
        console.error("Failed to load dictionary", e);
        return new Set();
    }
};
