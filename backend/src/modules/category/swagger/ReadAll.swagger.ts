import { ApiOperationOptions } from '@nestjs/swagger';

export const Operation: ApiOperationOptions = {
    summary: '카테고리 조회 API',
    description: '특정 사용자의 카테고리를 조회',
};

export const _200 = {
    status: 200,
    description: '사용자가 가진 모든 카테고리',
};
