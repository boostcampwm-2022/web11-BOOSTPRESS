import { Category, Tag, User } from '@prisma/client';

export * from './Author.dto';
export * from './Category.dto';

export class JoinDTO {
    author: User;
    tags: Tag[];
    category: Category;
}
