import { readFile } from 'fs/promises';
import { parseValtoString } from './utils';

class TextReader {
    private _path: string;

    constructor(path: unknown) {
        this._path = parseValtoString(path);
    }

    public get path(): string {
        return this._path;
    }

    public set path(path: string) {
        this._path = parseValtoString(path);
    }

    public async read(): Promise<string> {
        try {
            return readFile(this.path, { encoding: 'utf-8' });
        } catch (error) {
            throw new Error(`Error reading file "${this.path}": ${error}`);
        }
    }
}

async function main() {
    const PATH = "test.txt";
    try {
        const reader = new TextReader(PATH);
        console.log(await reader.read());
    } catch (error) {
        console.error(error);
    }
}

main();