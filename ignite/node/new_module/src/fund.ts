import { Readable, Writable, Transform } from "node:stream"
import { TransformCallback } from "stream";

class OneHundredStream extends Readable {
    private index: number = 0;

    _read(size: number): void {
        const i = this.index++;

        if (i > 100) {
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
    }
}

class MultiplyByTen extends Writable {
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        console.log(
            Number(chunk.toString()) * 10
        )
        callback()
    }
}

class ConverseIntoNegative extends Transform {
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
       const transformed = Number(chunk.toString()) * -1

       callback(null, Buffer.from(transformed))
    }
}

new OneHundredStream()
    .pipe(
        new ConverseIntoNegative()
    )
    .pipe(
        new MultiplyByTen()
    )
