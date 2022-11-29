/* @jsxRuntime automatic @jsxImportSource react */
import React, { createElement } from 'react';

import EasyMDE from 'easymde';
import { renderToStaticMarkup } from 'react-dom/server';
import { evaluateSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import rehypeHighlight from 'rehype-highlight';

//string으로 된 mdx => 컴포넌트로 변환
export const generate = (body: string) => {
    const mdx = evaluateSync(body, {
        ...(runtime as any),
        rehypePlugins: [rehypeHighlight],
    }).default;

    console.log(renderToStaticMarkup(createElement(mdx)));

    return renderToStaticMarkup(createElement(mdx));
};

interface EasyEditerType {
    toolbar: any;
    easymde: any;
    mdxComponents: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

/**
 *
 * @param toolbar toolbar 커스텀
 * @param easymde easymde
 * @param mdxComponents 커스텀할 컴포넌트 목록
 * @param setContent 에디터 값을 useState로 관리할 수 있게
 * @returns
 */
export function EasyEditer({
    toolbar = [],
    easymde: easymdeConfig = {},
    mdxComponents = '',
    setContent,
}: EasyEditerType) {
    const config = {
        ...{
            sideBySideFullscreen: false,
            autoDownloadFontAwesome: true,
            forceSync: true,
            autofocus: true,
            indentWithTabs: false,
            spellChecker: false,
        },
        toolbar,
        ...easymdeConfig,
    };

    const easymde = new EasyMDE({
        ...config,
        previewRender: (plainText: any) => {
            setContent(plainText);

            return generate(mdxComponents + plainText);
        },
    });
    EasyMDE.toggleSideBySide(easymde);

    return easymde;
}
