import { blogSideBarInfoType } from './apiTypes';

export function getBlogSideBarInfo(): blogSideBarInfoType {
    return {
        bio: '날 어떻게 한줄로 소개해',
        imageURL: 'https://picsum.photos/200',
        sns_link: [{ sns_name: 'linkedin', link: 'https://google.com' }],
        category: [
            {
                id: 1,
                name: '확장가능',
                depth: 1,
                child: [{ id: 1, name: '하위1', depth: 2, child: [] }],
            },
            {
                id: 1,
                name: '확장불가',
                depth: 1,
                child: [],
            },
        ],
        tag: [
            { name: '태그1호', article_count: 1 },
            { name: '태그2호', article_count: 2 },
        ],
    };
}
