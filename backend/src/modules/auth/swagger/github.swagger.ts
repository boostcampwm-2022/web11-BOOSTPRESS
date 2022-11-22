import { UnauthorizedException } from '@nestjs/common';
import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { LoginResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '로그인 API',
    description:
        'GitHub OAuth를 이용해 로그인한 뒤, JWT 세션을 쿠키로 저장한다.',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '로그인된 사용자 데이터',
    type: LoginResponseDTO,
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인에 실패함',
    type: UnauthorizedException,
};