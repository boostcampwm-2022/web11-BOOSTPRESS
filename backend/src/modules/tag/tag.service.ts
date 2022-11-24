import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDTO } from './dto';

@Injectable()
export class TagService {
    constructor(private readonly prisma: PrismaService) {}

    async readAll() {
        return await this.prisma.tag.findMany();
    }

    // async create(data: CreateDTO) {
    //     return await this.prisma.tag.create({ data });
    // }
}
