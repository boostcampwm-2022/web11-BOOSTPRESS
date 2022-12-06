import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/types';
import { UrlDto } from '../dto';

export const Operation: ApiOperationOptions = {
    summary: '이미지 업로드 API',
    description: `이미지를 ncloud object storage에 올린 후 해당 URL을 가져온다.
        이미지를 file이라는 이름으로 form-data 형식으로 전송하면 된다. - 해당 부분을 swagger로 나타내는 법을 알아보고 있습니다..
        테스트는 Postman으로 진행해봤고 notion API 명세 끝부분에 사진이 첨부되어 있으니 확인해주시면 감사하겠습니다.`,
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
