import { Dirent, readdirSync } from 'fs';
import { copyFile } from 'fs/promises';
import { join } from 'path';


async function main(): Promise<void> {
    printHelp()
    const dirName = getDirName()
    const files = getPngFileNames(dirName)
    if (files.length === 0) {
        console.log("[ERROR] There is no png files in directory");
        process.exit(1)
    }
    const randomFileName = getRandomFile(files)
    await copyToRandom(randomFileName, dirName)
}

async function copyToRandom(randomFileName: string, dirName: string): Promise<void> {
    const src = join(dirName, randomFileName)
    const dest = join(dirName, 'random.png')
    await copyFile(src, dest)
        .then(_ => {
            console.log(`[INFO] Successfully copied ${randomFileName} to random.png`);
        })
        .catch(e => {
            console.log(`[ERROR] Failed to copy file ${randomFileName} to random.png`);
            console.log(e);
            process.exit(1)
        })
}

function getRandomFile(files: string[]): string {
    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random()*(max - min + 1) + min)
    }
    const randomNumber: number = randomInt(0, files.length - 1)
    const randomFile: string = files[randomNumber]
    return randomFile
}

function getPngFileNames(dirName: string): string[] {
    const isPngFile = (x: Dirent) => {
        return x.isFile() && x.name.slice(-3) === 'png'
    }
    return readdirSync(dirName, { withFileTypes: true })
            .filter(x => isPngFile(x))
            .map(x => x.name)
}

function getDirName(): string {
    if (process.argv.length > 3) {
        printHelp()
        process.exit(1)
    }
    if (process.argv.length > 2) {
        return process.argv[2]
    }
    return __dirname
}

function printHelp(): void {
    if (process.argv[2] === "--help") {
        const helpMessage = getHelpMessage()
        console.log(helpMessage)
        process.exit(0)
    }
}

function getHelpMessage(): string {
    const helpMessage = `
To get help just type:
$ random_png.js --help
Try this:
$ random_png.js ~/Pictures/Wallpapers/
Or just
$ random_png.js
in directory with PNGs
    `
    return helpMessage;
}

main()
