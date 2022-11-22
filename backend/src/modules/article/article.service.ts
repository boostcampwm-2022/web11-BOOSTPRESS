import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { repoName } from '../auth/test';

@Injectable()
export class ArticleService {
    private readonly TEST_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly config: ConfigService,
        httpService: HttpService,
    ) {
        this.TEST_ACCESS_TOKEN = this.config.get('TEST_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    async commit(user: User) {
        const { data } = await this.axios.put(
            `https://api.github.com/repos/${user.login}/${repoName}/contents/test.md`,
            {
                message: '',
                content: Buffer.from(`this is a test text`).toString('base64'),
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
