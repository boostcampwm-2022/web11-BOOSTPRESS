/* @jsxRuntime automatic @jsxImportSource react */
import React, { createElement } from 'react';

import EasyMDE from 'easymde';
import { renderToStaticMarkup } from 'react-dom/server';
import { evaluateSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import mdxComponents from './mdxComponent';

//string으로 된 mdx => 컴포넌트로 변환
export const generate = (body: string) => {
    const mdx = evaluateSync(body, {
        ...(runtime as any),
    }).default;

    return renderToStaticMarkup(createElement(mdx));
};

interface EasyEditerType {
    toolbar: any;
    easymde: any;
    mdxComponents: string;
}

export function EasyEditer({
    toolbar = [],
    easymde: easymdeConfig = {},
    mdxComponents = '',
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
            return generate(mdxComponents + plainText);
        },
    });
    EasyMDE.toggleSideBySide(easymde);

    return easymde;
}
