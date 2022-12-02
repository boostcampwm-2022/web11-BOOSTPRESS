import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/types';
import { UrlDto } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '이미지 업로드 API',
    description:
        '이미지를 ncloud object storage에 올린 후 해당 URL을 가져온다.',
};

export const _201: ApiResponseOptions = {
    status: 201,
    description: '이미지 업로드 성공',
    type: UrlDto,
};

export const _401: ApiResponseOptions = {
    status: 401,
    description: '로그인에 실패함',
    type: ExceptionResponse,
};
