import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
    constructor() {}

    async create(file, createImgDto: { name: string; image_file: Buffer }) {
        const fileName = randomUUID() + '.' + file.mimetype.split('/')[1];
        const goalPath = path.resolve(__dirname, `../../../images/${fileName}`);
        fs.writeFile(goalPath, file.buffer, 'binary', (err) => {
            if (err) {
                console.log('err!');
            }
        });
        return fileName;
    }

    async findAll() {}
    async getById(id) {}
    async removeImage() {}
}
