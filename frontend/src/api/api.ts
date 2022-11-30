import {
    blogSideBarInfoType,
    MultipleArticleAPIType,
    tagType,
    createArticleType,
} from './apiTypes';

const url = process.env.REACT_APP_API_URL;
const mockURL = 'http://localhost:3000';

export async function getBlogSideBarInfo(userId: string) {
    const res = await fetch(mockURL + `/blog/${userId}`);
    return (await res.json()) as blogSideBarInfoType;
}

//추천게시물 받아오는 가상 api (나중에 조회수,추천수 등등 만들어야함)
export async function getFeaturePostInfo() {
    const res = await fetch(mockURL + '/articles');
    return (await res.json()) as MultipleArticleAPIType;
}

export async function getArticlesWithUserId(
    userId: string,
    page: number = 1,
    category?: string,
) {
    const res = await fetch(
        mockURL +
            '/articles?' +
            new URLSearchParams({
                userId,
                page: page.toString(),
                ...(category ? { category } : {}),
            }),
    );
    return (await res.json()) as MultipleArticleAPIType;
}

export async function getAllTags() {
    const res = await fetch(url + '/tag', {
        method: 'GET',
        credentials: 'include',
    });
    return (await res.json()) as tagType[];
}

export async function createArticle(param: createArticleType) {
    const res = await fetch(url + '/article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        credentials: 'include',
        body: JSON.stringify(param),
    });

    return await res.json();
}

export async function getUserInfo() {
    const res = await fetch(url + '/auth/me', {
        method: 'GET',
        credentials: 'include',
    });
    return await res.json();
}
