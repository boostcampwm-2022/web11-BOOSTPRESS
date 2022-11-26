import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/types';
import { ArticleResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '게시글 작성 API',
    description:
        '게시글을 작성해 .md 파일로 저장한 뒤, GitHub API를 이용해 작성한 게시글을 commit한다.',
};

export const _201: ApiResponseOptions = {
    status: 201,
    description: 'GitHub API로 commit한 결과',
    type: ArticleResponseDTO,
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인되어 있지 않음',
    type: ExceptionResponse,
};
