import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDTO } from './dto';
import { CategoryResponse } from './dto/CategoryResponse.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(ownerId: number) {
        return await this.prisma.category.findMany({ where: { ownerId } });
    }

    async create(user: User, dto: CategoryDTO): Promise<CategoryResponse> {
        const category = await this.prisma.category.create({
            data: {
                ownerId: user.id,
                name: dto.name,
            },
        });

        return category;
    }
}
