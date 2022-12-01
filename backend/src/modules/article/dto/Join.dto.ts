import { Category, Tag, User } from '@prisma/client';

export class JoinDTO {
    author: User;
    tags: Tag[];
    category: Category;
}
