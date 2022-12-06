import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { DetailedResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '블로그 정보 API',
    description: '특정 사용자의 블로그 정보를 가져오는 API',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '특정 사용자의 블로그 정보',
    type: DetailedResponseDTO,
};
