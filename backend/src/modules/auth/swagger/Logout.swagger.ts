import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/types';

export const Operation: ApiOperationOptions = {
    summary: '로그아웃 API',
    description:
        '쿠키에 존재하는 JWT 세션을 제거한 뒤, 세션 테이블에서 현재 세션을 soft delete한다.',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '로그아웃한 이후 프론트엔드로 redirect',
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인되어 있지 않음',
    type: ExceptionResponse,
};
