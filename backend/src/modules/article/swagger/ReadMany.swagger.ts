import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ListResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '게시글 목록 조회 API',
    description: '특정 조건을 만족하는 게시글 목록의 정보를 가져오는 API',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '게시글 목록 정보',
    type: ListResponseDTO,
};
