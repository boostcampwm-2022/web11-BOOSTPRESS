/* @jsxRuntime automatic @jsxImportSource react */
import React from 'react';

import EasyMDE from 'easymde';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import Content from './sample.mdx';
import { compile, compileSync, evaluate, evaluateSync } from '@mdx-js/mdx';
import { MDXProvider } from '@mdx-js/react';

export default function mdxEditor({
    components = [],
    replacements = {},
    toolbar = null,
    easymde: easymdeConfig = {},
}: any) {
    const scope = components.reduce(
        (scope: any, { tagname, component }: any) => ({
            ...scope,
            [tagname]: component,
        }),
        {},
    );

    const config = {
        ...{
            autoDownloadFontAwesome: true,
            forceSync: true,
            autofocus: true,
            indentWithTabs: false,
            spellChecker: false,
        },
        ...easymdeConfig,
    };
    const component = {
        em: (props: any) => <i {...props} />,
    };

    const test = (plainText: string) => {
        const w = compileSync(plainText, {
            format: 'mdx',
            jsx: true,
        });
        console.log(w);

        return <MDXProvider>{w.value}</MDXProvider>;
    };

    const easymde = new EasyMDE({
        ...config,
        previewRender: (plainText: any) => {
            console.log(test(plainText));
            return renderToStaticMarkup(test(plainText));
        },
    });
    EasyMDE.toggleSideBySide(easymde);

    return easymde;
}
