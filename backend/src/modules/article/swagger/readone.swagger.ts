import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ArticleResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '단일 게시글 API',
    description: '특정 게시글의 컨텐츠를 포함한 정보를 가져오는 API',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '게시글 정보',
    type: ArticleResponseDTO,
};
