
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


//추천게시물 받아오는 가상 api (나중에 조회수,추천수 등등 만들어야함)
export function getFeaturePostInfo(): postCardInfoType[] {
    return [
        {
            imgURL: 'https://picsum.photos/230/144',
            title: '제목이지롱',
            category: '리액트',
            date: '2022-11-01',
            authorId: 'supersfel',
            postURL: 'post/123s',
        },
        {
            //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
            imgURL: 'https://picsum.photos/230/144',
            title: '제목이지롱',
            category: '리액트',
            date: '2022-11-01',
            authorId: 'supersfel',
            postURL: 'post/123s',
        },
        {
            //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
            imgURL: 'https://picsum.photos/230/144',
            title: '제목이지롱',
            category: '리액트',
            date: '2022-11-01',
            authorId: 'supersfel',
            postURL: 'post/123s',
        },
        {
            //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
            imgURL: 'https://picsum.photos/230/144',
            title: '제목이지롱',
            category: '리액트',
            date: '2022-11-01',
            authorId: 'supersfel',
            postURL: 'post/123s',
        },
        {
            //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
            imgURL: 'https://picsum.photos/230/144',
            title: '제목이지롱',
            category: '리액트',
            date: '2022-11-01',
            authorId: 'supersfel',
            postURL: 'post/123s',
        },
        {
            //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
            imgURL: 'https://picsum.photos/230/144',
            title: '제목이지롱',
            category: '리액트',
            date: '2022-11-01',
            authorId: 'supersfel',
            postURL: 'post/123s',
        },
    ];
}

