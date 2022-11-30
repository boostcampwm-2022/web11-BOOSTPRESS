import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryResponseDTO, CategoryDTO } from './dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async readByUserId(ownerId: number) {
        const categories = await this.prisma.category.findMany({
            where: { ownerId, deleted: false },
            include: { childCategory: true },
        });

        // 카테고리의 배열을 트리 형태로 만들기 위한 객체
        const categoryObj = categories
            .map((category) => CategoryResponseDTO.fromCategory(category))
            .reduce(
                (acc, category) => ((acc[category.id] = category), acc),
                {} as { [id: string]: CategoryResponseDTO },
            );

        // 부모가 있는 카테고리는 부모 카테고리의 자식으로 삽입
        // 객체를 가리키는 포인터가 삽입되므로 메모리를 크게 낭비하지 않음
        Object.values(categoryObj).forEach((category) => {
            const { parentId } = category;
            if (parentId !== null)
                categoryObj[parentId].children.push(category);
        });

        // 부모 카테고리가 있는 카테고리를 제거하여
        // 부모 카테고리가 있는 카테고리는 부모 카테고리의 children에서만 찾아볼 수 있도록 변경
        return Object.values(categoryObj).filter(
            (category) => category.parentId === null,
        );
    }

    async create(user: User, dto: CategoryDTO): Promise<CategoryResponseDTO> {
        const category = await this.prisma.category.create({
            data: {
                ownerId: user.id,
                name: dto.name,
                parentCategoryId: dto.parentId,
            },
        });

        return CategoryResponseDTO.fromCategory(category);
    }

    async update(user: User, dto: CategoryDTO, id: number) {
        const { name, parentId: parentCategoryId } = dto;

        await this.getCategoryWithUser(id, user);
        const category = await this.prisma.category.update({
            where: { id },
            data: { name, parentCategoryId },
        });

        return CategoryResponseDTO.fromCategory(category);
    }

    async delete(user: User, id: number) {
        await this.getCategoryWithUser(id, user);
        const category = await this.prisma.category.update({
            where: { id },
            data: { deleted: true },
        });

        return CategoryResponseDTO.fromCategory(category);
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
