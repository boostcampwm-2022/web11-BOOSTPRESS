import {
    blogSideBarInfoType,
    MultipleArticleAPIType,
    tagType,
    createArticleType,
    postType,
    authUserInfoType,
    updateArticleType,
    noneType,
    updateArticleResType,
    MultipleArticleUserType,
    blogType,
} from './apiTypes';

const url = process.env.REACT_APP_API_URL;
const mockURL = 'http://localhost:3000';

export async function getBlogSideBarInfo(userId: string) {
    const res = await fetch(mockURL + `/blog/${userId}`);
    return (await res.json()) as blogSideBarInfoType;
}

export async function getFeaturePostInfo() {
    const res = await fetch(url + '/article');
    return (await res.json()) as MultipleArticleAPIType;
}

export async function getArticlesWithUserId(
    authorId: string,
    page: number = 1,
    category?: string,
) {
    const res = await fetch(
        url +
            '/article?' +
            new URLSearchParams({
                authorId,
                page: page.toString(),
                ...(category ? { category } : {}),
            }),
    );

    return (await res.json()) as MultipleArticleUserType;
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

export async function updateArticle(param: updateArticleType, postId: Number) {
    const res = await fetch(url + `/article/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },

        credentials: 'include',
        body: JSON.stringify(param),
    });

    return (await res.json()) as updateArticleResType;
}

export async function getUserInfo() {
    const res = await fetch(url + '/auth/me', {
        method: 'GET',
        credentials: 'include',
    });
    return (await res.json()) as authUserInfoType;
}

//게시글 조회 페이지에서 게시글 정보를 받아오는 api
export async function getArticleInfo(postId: string) {
    const res = await fetch(url + `/article/${postId}`, {
        method: 'GET',
        credentials: 'include',
    });
    return (await res.json()) as postType & noneType;
}

export async function getBlogInfo(id: number) {
    const res = await fetch(url + `/blog/${id}`, {
        method: 'GET',
        credentials: 'include',
    });
    return (await res.json()) as blogType;
}

export async function updateBlogInfo(dto: blogType) {
    const res = await fetch(url + `/blog`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dto),
    });
    return (await res.json()) as blogType;
}

export async function uploadImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    const res = await fetch(url + '/image/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });
    return (await res.json()) as { imageURL: string };
}
