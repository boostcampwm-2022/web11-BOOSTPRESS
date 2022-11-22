import { UnauthorizedException } from '@nestjs/common';
import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { LoginResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '사용자 체크 API',
    description:
        '사용자가 로그인되어 있다면 프론트엔드에 노출 가능한 사용자 정보를 반환',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '로그인된 사용자 데이터',
    type: LoginResponseDTO,
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인되어 있지 않음',
    type: UnauthorizedException,
};
