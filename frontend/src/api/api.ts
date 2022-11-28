import {
    blogSideBarInfoType,
    MultipleArticleAPIType,
    tagType,
} from './apiTypes';

export async function getBlogSideBarInfo(userId: string) {
    const res = await fetch(`/api/blog/${userId}`);
    return (await res.json()) as blogSideBarInfoType;
}

//추천게시물 받아오는 가상 api (나중에 조회수,추천수 등등 만들어야함)
export async function getFeaturePostInfo() {
    const res = await fetch('/api/articles');
    return (await res.json()) as MultipleArticleAPIType;
}

export async function getArticlesWithUserId(
    userId: string,
    page: number = 1,
    category?: string,
) {
    const res = await fetch(
        '/api/articles?' +
            new URLSearchParams({
                userId,
                page: page.toString(),
                ...(category ? { category } : {}),
            }),
    );
    return (await res.json()) as MultipleArticleAPIType;
}

export async function getAllTags() {
    const res = await fetch('/api/tags');
    return (await res.json()) as { tags: tagType[] };
}
