import { HttpService } from '@nestjs/axios';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Article, User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { repoName } from '../auth/test';
import { PrismaService } from '../prisma/prisma.service';
import {
    CommitResponseDTO,
    FetchResponseDTO,
    PatchArticleDTO,
    PostArticleDTO,
} from './dto';

@Injectable()
export class ArticleService {
    private readonly TEST_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly prisma: PrismaService,
        config: ConfigService,
        httpService: HttpService,
    ) {
        this.TEST_ACCESS_TOKEN = config.get('TEST_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    async create(user: User, dto: PostArticleDTO) {
        const article = await this.prisma.article.create({
            data: {
                authorId: user.id,
                title: dto.title,
            },
        });

        await this.commit(user, dto, article);
        return { id: article.id };
    }

    async readOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            select: { author: true, deleted: true },
        });

        if (article === null || article.deleted) {
            const message = `게시글 #${id}이(가) 존재하지 않습니다!`;
            throw new UnauthorizedException(message);
        }

        const { data } = await this.axios.get<FetchResponseDTO>(
            `https://api.github.com/repos/${article.author.login}/${repoName}/readme/${id}`,
        );

        data.content = Buffer.from(data.content, 'base64').toString();

        return { content: data.content };
    }

    async update(user: User, dto: PatchArticleDTO) {
        const article = await this.getArticleWithUser(dto.id, user.id);

        await Promise.all([
            this.commit(user, dto, article),
            this.prisma.article.update({
                where: { id: dto.id },
                data: { title: dto.title },
            }),
        ]);

        return { id: article.id };
    }

    async delete(user: User, id: number) {
        const article = await this.getArticleWithUser(id, user.id);

        await this.prisma.article.update({
            where: { id },
            data: { deleted: true },
        });

        return { id: article.id };
    }

    private async getArticleWithUser(id: number, authorId: number) {
        const article = await this.prisma.article.findFirst({
            where: { id },
        });

        if (article.authorId !== authorId) {
            const message = '게시글이 현재 사용자가 작성한 게시글이 아닙니다!';
            throw new ForbiddenException(message);
        }
        if (article.deleted) {
            const message = '삭제된 게시글입니다!';
            throw new BadRequestException(message);
        }

        return article;
    }

    private async commit(user: User, dto: PostArticleDTO, article: Article) {
        const requestData = {
            message: dto.title,
            content: Buffer.from(dto.content).toString('base64'),
            committer: {
                name: user.login,
                email: user.email,
            },
            sha: article.updateSHA ?? '',
        };

        if (requestData.sha === '') delete requestData.sha;

        const { data } = await this.axios.put<CommitResponseDTO>(
            `https://api.github.com/repos/${user.login}/${repoName}/contents/${article.id}/README.md`,
            requestData,
            { headers: { Authorization: `Bearer ${this.TEST_ACCESS_TOKEN}` } },
        );

        await this.prisma.article.update({
            where: { id: article.id },
            data: { updateSHA: data.content.sha },
        });

        return data;
    }
}

/**
 * =======
    @Post('')
    async write(@CurrentUser() user: User, @Body() dto: PostArticleDTO) {
        await this.articleService.commit(user, dto);

        //=> DB에 정보를 저장한다.
        const fileId = 123; // db에서 file id를 가져온다.

        //=> 로컬 파일을 생성한다.
        const goalPath = path.resolve(__dirname, `../../../articles/${fileId}`);
        if (fs.existsSync(goalPath)) {
            throw new Error('fileId already exists.');
        }
        fs.mkdirSync(goalPath, { recursive: true });
        fs.writeFileSync(goalPath + `/${dto.title}.md`, dto.content);

        return null;
    }

    @ApiOperation(UpdateFile.Operation)
    @ApiResponse(UpdateFile._200)
    @ApiResponse(UpdateFile._401)
    // @UseGuards(JwtGuard)
    @Patch('/:postId')
    async updateFile(
        @CurrentUser() user: User,
        @Body() dto: PostArticleDTO,
        @Param('postId') postId: number,
    ) {
        // 수정 내용인 dto를 그대로 커밋하면 될까요?
        // await this.articleService.commit(user, dto);

        //=> DB에 정보를 저장한다.

        //=> 로컬 파일을 수정한다.
        // 삭제 후 새로 생성?
        const goalPath = path.resolve(
            __dirname,
            `../../../articles/${postId}/${dto.title}.md`,
        );
        if (!fs.existsSync(goalPath)) {
            throw new Error('수정하려는 파일이 존재하지 않습니다.');
        }
        fs.writeFileSync(goalPath, dto.content);

        return null;
    }

    @ApiOperation(DeleteFile.Operation)
    @ApiResponse(DeleteFile._200)
    @ApiResponse(DeleteFile._401)
    // @UseGuards(JwtGuard)
    @Delete('/:postId')
    async deleteFile(
        @CurrentUser() user: User,
        @Param('postId') postId: number,
    ) {
        // 삭제한 내용은 어떻게 커밋해야하나요?
        // await this.articleService.commit(user, dto);

        //=> DB에 정보를 저장한다.

        //=> 로컬 파일을 삭제한다.
        const goalPath = path.resolve(__dirname, `../../../articles/${postId}`);
        if (!fs.existsSync(goalPath)) {
            throw new Error('삭제하려는 폴더가 존재하지 않습니다.');
        }
        fs.rmdirSync(goalPath, { recursive: true });

        return null;
>>>>>>> Stashed changes
 */
