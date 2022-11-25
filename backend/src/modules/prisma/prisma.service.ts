import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Env } from 'src/types';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService<Env>) {
        const url = config.get('DATABASE_URL');
        super({ datasources: { db: { url } } });
    }
}
