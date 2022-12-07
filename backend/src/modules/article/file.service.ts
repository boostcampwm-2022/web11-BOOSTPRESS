import { BadRequestException, Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { resolve } from 'path';
import { promises as fs } from 'node:fs';

@Injectable()
export class FileService {
    constructor() {}

    private folderPath(articleId: number) {
        return resolve(`${process.cwd()}/articles/${articleId}`);
    }

    async write(article: Article, content: string) {
        const filePath = this.folderPath(article.id);

        try {
            await fs.readdir(filePath);
        } catch {
            await fs.mkdir(filePath, { recursive: true });
        } finally {
            await fs.writeFile(`${filePath}/README.md`, content);
        }
    }

    async read(articleId: number) {
        const filePath = this.folderPath(articleId);

        try {
            const content = await fs.readFile(`${filePath}/README.md`);
            return Buffer.from(content).toString();
        } catch {
            const message = `게시글 #${articleId}의 파일이 존재하지 않습니다!`;
            throw new BadRequestException(message);
        }
    }

    async parsingMainImageURL(content: string) {
        const imageRegex = /\!\[\]\([^\)]*\)/;
        const imageText = imageRegex.exec(content);
        const mainImageURL = imageText ? imageText[0].slice(4, -1) : '';
        return mainImageURL;
    }
}
