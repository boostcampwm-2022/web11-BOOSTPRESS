import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryResponse, CategoryDTO } from './dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(ownerId: number) {
        return await this.prisma.category.findMany({
            where: { ownerId, deleted: false },
        });
    }

    async create(user: User, dto: CategoryDTO): Promise<CategoryResponse> {
        const category = await this.prisma.category.create({
            data: {
                ownerId: user.id,
                name: dto.name,
            },
        });

        return CategoryResponse.fromCategory(category);
    }

    async update(user: User, dto: CategoryDTO, id: number) {
        const { name } = dto;

        await this.getCategoryWithUser(id, user);
        const category = await this.prisma.category.update({
            where: { id },
            data: { name },
        });

        return CategoryResponse.fromCategory(category);
    }

    async delete(user: User, id: number) {
        await this.getCategoryWithUser(id, user);
        const category = await this.prisma.category.update({
            where: { id },
            data: { deleted: true },
        });

        return CategoryResponse.fromCategory(category);
    }

    private async getCategoryWithUser(id: number, user: User) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });

        if (category.ownerId !== user.id) {
            const message =
                '카테고리가 현재 사용자가 생성한 카테고리가 아닙니다!';
            throw new ForbiddenException(message);
        }
        if (category.deleted) {
            const message = '삭제된 카테고리입니다!';
            throw new BadRequestException(message);
        }

        return category;
    }
}
