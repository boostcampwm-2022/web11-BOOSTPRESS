import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        const DATABASE_URL = 'DATABASE_URL';

        super({
            datasources: {
                db: {
                    url: config.get(DATABASE_URL),
                },
            },
        });
    }
}
