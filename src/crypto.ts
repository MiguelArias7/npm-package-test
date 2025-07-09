import { Hash, createHash } from 'crypto';

const text = 'Hello, world!';
let hash: string = createHash('sha256').update(text).digest('hex');

console.log(`Hash of "${text}": ${hash}`);