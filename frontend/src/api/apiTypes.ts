export interface blogSideBarInfoType {
    bio: string;
    imageURL: string;
    sns_link: snsLinkType[];
    category: categoryType[];
    tag: tagType[];
}

export interface categoryType {
    id: number;
    name: string;
    depth: number;
    child: categoryType[];
}

export interface postType {
    imgURL: string;
    id: number;
    title: string;
    content: string;
    author_id: number;
    created: string;
    updated: string;
    category_name?: string;
    series?: {
        name: string;
        articles: { name: string; id: number }[];
    };
    tag: string[];
}

export interface MultipleArticleAPIType {
    articles: postCardInfoType[];
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

interface tagType {
    name: string;
    article_count: number;
}
