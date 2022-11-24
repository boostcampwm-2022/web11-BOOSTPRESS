import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/types';
import { PostArticleResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '게시글 삭제 API',
    description: 'DB에 존재하는 게시글 정보를 soft delete',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '삭제한 게시글의 정보',
    type: PostArticleResponseDTO,
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인되어 있지 않음',
    type: ExceptionResponse,
};
