import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { BlogBriefResponseDTO } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '블로그 정보 수정 API',
    description: '로그인하 사용자의 블로그 정보를 수정하는 API',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '수정된 사용자의 블로그 정보',
    type: BlogBriefResponseDTO,
};
