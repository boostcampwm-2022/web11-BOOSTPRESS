export interface blogSideBarInfoType {
    bio: string;
    imageURL: string;
    sns_link: snsLinkType[];
    category: categoryType[];
    tag: tagType & { article_count: number }[];
}

export interface categoryType {
    name: string;
    id: number;
    parentId: number;
    children: categoryType[];
}

export interface postType {
    id: number;
    title: string;
    content: string;
    author: {
        id: number;
        nickname: string;
    };
    tags: {
        id: number;
        name: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    category?: {
        id: number;
        name: string;
    };
    series?: {
        name: string;
        articles: { name: string; id: number }[];
    };
    mainImageURL: string | null;
}

export interface noneType {
    statusCode: number;
    message: string;
    error: string;
}

export interface MultipleArticleAPIType {
    articles: postType[];
}

export interface MultipleArticleUserType {
    articles: postType[];
    totalPages: number;
}

export interface createArticleType {
    title: string;
    content: string;
    tagId: number[];
}

export interface updateArticleType {
    title: string;
    content: string;
    tagId: number[];
}

export interface updateArticleResType {
    title: string;
    content: string;
    tagId: number[];
}

export interface postCardInfoType {
    imgURL: string;
    title: string;
    category: string;
    date: string;
    authorId: string;
    postURL: string;
}

export interface authUserInfoType {
    nickname: string;
    email: string;
    id: number;
}

interface snsLinkType {
    sns_name: string;
    link: string;
}

export interface tagType {
    name: string;
    id: number;
}

export interface snsType {
    snsName: string;
    link: string;
}

export interface blogType {
    blogName: string;
    nickname: string;
    imageURL: string;
    bio: string;
    snsLink: snsType[];
}
