import { ApiOperationOptions } from '@nestjs/swagger';

export const Operation: ApiOperationOptions = {
    summary: '카테고리 삭제 API',
    description: '불필요한 카테고리를 삭제',
};

export const _200 = {
    status: 200,
    description: '삭제된 카테고리',
};
