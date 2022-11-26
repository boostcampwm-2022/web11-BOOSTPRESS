// ⚠️ Important! Please make sure the dependencies are up to date.
// You can refresh them in the Dependencies section (left-bottom on CodeSandbox)

import { createElement, useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate, evaluateSync } from '@mdx-js/mdx';
import { renderToStaticMarkup } from 'react-dom/server';

const mdxContent = `
export const planet = 'World'



# Hello, {planet}!

* list
* item
* hi
`;

export const useMDX = (content: any) => {
    const [exports, setExports] = useState<any>();

    useEffect(() => {
        evaluate(mdxContent, { ...(runtime as any) }).then((exports) =>
            setExports(exports),
        );
    }, [content]);

    return exports;
};
export const generate = (body: string) => {
    const mdx = evaluateSync(body, {
        ...(runtime as any),
    }).default;

    return renderToStaticMarkup(createElement(mdx));
};
