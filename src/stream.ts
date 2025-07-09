import * as fs from "fs";
import * as path from "path";


const filePath = path.join(__dirname, '../assets/eloquent.txt')
const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });
const writableStream = fs.createWriteStream('output-eloquent.txt');

readableStream.on('data', (chunk: string | Buffer) => {
    console.log('Chunk: ', chunk.toString());
    writableStream.write(chunk);
});

readableStream.on('end', () => {
    console.log('Termino la lectura del archivo');
    writableStream.end();
});

readableStream.on('error', (err: unknown) => {
    console.log('error de lectura del archivo', err)
})

writableStream.on('error', (err: unknown) => {
    console.log('error en la escritura del archivo', err)
})