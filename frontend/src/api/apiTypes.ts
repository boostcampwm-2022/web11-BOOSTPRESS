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
    authorId: number;
    tagId: number[];
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
}

export interface postCardInfoType {
    imgURL: string;
    title: string;
    category: string;
    date: string;
    authorId: string;
    postURL: string;
}

interface snsLinkType {
    sns_name: string;
    link: string;
}

export interface tagType {
    name: string;
    id: string;
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
