export interface blogSideBarInfoType {
    bio: string;
    imageURL: string;
    sns_link: snsLinkType[];
    category: categoryType[];
    tag: tagType & { article_count: number }[];
}

export interface categoryType {
    id: number;
    name: string;
    depth: number;
    child: categoryType[];
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
}

export interface MultipleArticleAPIType {
    articles: postCardInfoType[];
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
