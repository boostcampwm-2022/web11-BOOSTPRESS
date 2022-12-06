import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/types';

@Injectable()
export class ImageService {
    private readonly NCLOUD_IMAGE_ACCESSKEY: string;
    private readonly NCLOUD_IMAGE_BUCKET: string;
    private readonly NCLOUD_IMAGE_ENDPOINT: string;
    private readonly NCLOUD_IMAGE_REGION: string;
    private readonly NCLOUD_IMAGE_SECRETKEY: string;
    private readonly S3: AWS.S3;

    constructor(config: ConfigService<Env>) {
        this.NCLOUD_IMAGE_ACCESSKEY = config.get('NCLOUD_IMAGE_ACCESSKEY');
        this.NCLOUD_IMAGE_BUCKET = config.get('NCLOUD_IMAGE_BUCKET');
        this.NCLOUD_IMAGE_ENDPOINT = config.get('NCLOUD_IMAGE_ENDPOINT');
        this.NCLOUD_IMAGE_REGION = config.get('NCLOUD_IMAGE_REGION');
        this.NCLOUD_IMAGE_SECRETKEY = config.get('NCLOUD_IMAGE_SECRETKEY');
        this.S3 = new AWS.S3({
            endpoint: new AWS.Endpoint(this.NCLOUD_IMAGE_ENDPOINT),
            region: this.NCLOUD_IMAGE_REGION,
            credentials: {
                accessKeyId: this.NCLOUD_IMAGE_ACCESSKEY,
                secretAccessKey: this.NCLOUD_IMAGE_SECRETKEY,
            },
        });
    }

    async create(file) {
        const fileName = randomUUID() + '.' + file.mimetype.split('/')[1];
        await this.S3.putObject({
            Bucket: this.NCLOUD_IMAGE_BUCKET,
            Key: fileName,
            ACL: 'public-read',
            Body: file.buffer,
            ContentType: file.mimetype,
        }).promise();

        return `${this.NCLOUD_IMAGE_ENDPOINT}/${this.NCLOUD_IMAGE_BUCKET}/${fileName}`;
    }
}
