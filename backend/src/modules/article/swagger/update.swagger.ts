import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/types';
import { PostArticleResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '게시글 수정 API',
    description:
        '이미 작성한 게시글을 수정한 뒤, GitHub API를 이용해 작성한 게시글을 commit한다.',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: 'GitHub API로 commit한 결과',
    type: PostArticleResponseDTO,
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인되어 있지 않음',
    type: ExceptionResponse,
};
