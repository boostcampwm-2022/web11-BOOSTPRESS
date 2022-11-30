import { ApiOperationOptions } from '@nestjs/swagger';
import { CategoryResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '카테고리 생성 API',
    description: '게시글을 분류할 카테고리를 생성',
};

export const _200 = {
    status: 200,
    description: '생성된 카테고리',
    type: CategoryResponseDTO,
};
