import { blogSideBarInfoType, MainPageArticleAPIType } from './apiTypes';

export async function getBlogSideBarInfo(userId: number) {
    const res = await fetch(`/api/articles/${userId}`);
    return (await res.json()) as blogSideBarInfoType;
}

//추천게시물 받아오는 가상 api (나중에 조회수,추천수 등등 만들어야함)
export async function getFeaturePostInfo() {
    const res = await fetch('/api/articles');
    return (await res.json()) as MainPageArticleAPIType;
}
