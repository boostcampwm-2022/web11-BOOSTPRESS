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

interface snsLinkType {
    sns_name: string;
    link: string;
}

interface tagType {
    name: string;
    article_count: number;
}
