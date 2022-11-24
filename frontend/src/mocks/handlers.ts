import { rest } from 'msw';

export const handlers = [
    rest.get('/api/blog/:userId', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                bio: '날 어떻게 한줄로 소개해',
                imageURL: 'https://picsum.photos/200',
                sns_link: [
                    { sns_name: 'linkedin', link: 'https://google.com' },
                ],
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
            }),
        );
    }),
    rest.get('/api/articles', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                articles: Array(6).fill({
                    imgURL: 'https://picsum.photos/230/144',
                    title: '제목이지롱',
                    category: '리액트',
                    date: '2022-11-01',
                    authorId: 'supersfel',
                    postURL: 'post/123s',
                }),
            }),
        );
    }),
    rest.get('/api/article', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                articles: Array(6).fill({
                    imgURL: 'https://picsum.photos/230/144',
                    title: '제목이지롱',
                    category: '리액트',
                    date: '2022-11-01',
                    authorId: 'supersfel',
                    postURL: 'post/123s',
                }),
            }),
        );
    }),
    rest.get('/api/tags', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                tags: [...Array(13)].map((_, idx) => ({
                    id: idx,
                    title: `태그 ${idx}`,
                })),
            }),
        );
    }),
];
