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
    img: string;
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

export interface postCardInfoType {
    //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
    img: string;
    title: string;
    category: string;
    date: string;
    authorId: string;
    postUrl: string;
}

interface snsLinkType {
    sns_name: string;
    link: string;
}

interface tagType {
    name: string;
    article_count: number;
}
