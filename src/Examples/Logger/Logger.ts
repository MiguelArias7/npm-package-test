import { log } from 'console';
import { readFile, writeFile } from 'fs/promises';
import { LOGGER_TYPE } from './const';

class Singleton {

    static #instance: Singleton;

    protected constructor() { }

    public static get instance(): Singleton {
        if (!Singleton.#instance) Singleton.#instance = new Singleton();
        return Singleton.#instance;
    }
}

interface ILogger<T> {
    addLog(message: T): Promise<boolean>;
    getLogs(): Promise<Array<T>>;
}

class ConsoleLoger implements ILogger<string> {

    private logs: Array<string> = new Array<string>();

    async addLog(message: string): Promise<boolean> {
        this.logs.push(message);
        return true;
    }

    async getLogs(): Promise<Array<string>> {
        return this.logs;
    }
}

class FileLogger implements ILogger<string> {

    constructor(private path: string) { };

    async addLog(message: string): Promise<boolean> {
        let data = await readFile(this.path);
        let a = data.toString('utf-8');
        await writeFile(this.path, `${a} \n ${message}`)
        return true;
    }

    async getLogs(): Promise<string[]> {
        let data = await readFile(this.path);
        return data.toString('utf-8').split('\n');
    }
}


class LoggerStringFactory {
    static create(type: LOGGER_TYPE, options?: { path: string }): ILogger<string> {
        switch (type) {
            case LOGGER_TYPE.CONSOLE:
                return new ConsoleLoger()
            case LOGGER_TYPE.FILE:
                return new FileLogger(options?.path || './test.txt')
            default:
                throw new Error(`${type} is not supported to create a Logger String`)
        }
    }
}

async function start() {

    const logger: ILogger<string> = LoggerStringFactory.create(LOGGER_TYPE.FILE);

    await logger.addLog("hola");
    await logger.addLog("este es");
    await logger.addLog("un test");
    console.log(await logger.getLogs());
}

start();




// abstract class Logger extends Singleton {
//     private _logs: Array<string>;
//     public abstract addLog(message: string): boolean;
// }


