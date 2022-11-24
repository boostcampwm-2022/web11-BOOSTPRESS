/* @jsxRuntime automatic @jsxImportSource react */
import React from 'react';

import EasyMDE from 'easymde';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import Content from './sample.mdx';
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

    const easymde = new EasyMDE({
        ...config,
        previewRender: (plainText: any) => {
            return renderToStaticMarkup(
                <MDXProvider components={replacements}>
                    {plainText}
                </MDXProvider>,
            );
        },
    });
    EasyMDE.toggleSideBySide(easymde);

    return easymde;
}
