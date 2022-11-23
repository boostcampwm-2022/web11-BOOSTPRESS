import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { repoName } from '../auth/test';
import { PostArticle } from './dto';

@Injectable()
export class ArticleService {
    private readonly TEST_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(config: ConfigService, httpService: HttpService) {
        this.TEST_ACCESS_TOKEN = config.get('TEST_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    async commit(user: User, dto: PostArticle) {
        const { data } = await this.axios.put(
            `https://api.github.com/repos/${user.login}/${repoName}/contents/${dto.title}.md`,
            {
                message: '',
                content: Buffer.from(dto.content).toString('base64'),
                committer: {
                    name: user.login,
                    email: user.email,
                },
            },
            { headers: { Authorization: `Bearer ${this.TEST_ACCESS_TOKEN}` } },
        );

        return data;
    }
}
