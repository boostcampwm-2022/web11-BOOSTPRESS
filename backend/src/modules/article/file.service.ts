import { BadRequestException, Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { UpsertDTO } from './dto';
import { resolve } from 'path';
import fs from 'node:fs';

@Injectable()
export class FileService {
    constructor() {}

    private folderPath(id: number) {
        return resolve(`${process.cwd()}/articles/${id}`);
    }

    async write(article: Article, dto: UpsertDTO) {
        const filePath = this.folderPath(article.id);

        try {
            await fs.promises.readdir(filePath);
        } catch {
            await fs.promises.mkdir(filePath, { recursive: true });
        } finally {
            await fs.promises.writeFile(`${filePath}/README.md`, dto.content);
        }
    }

    async read(id: number) {
        const filePath = this.folderPath(id);

        try {
            return await fs.promises.readFile(`${filePath}/README.md`);
        } catch {
            const message = `게시글 #${id}의 파일이 존재하지 않습니다!`;
            throw new BadRequestException(message);
        }
    }
}
