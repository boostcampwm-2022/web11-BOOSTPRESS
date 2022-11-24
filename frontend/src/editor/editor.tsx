import React from 'react';

import EasyMDE from 'easymde';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

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

    const easymde = new EasyMDE({
        ...config,
        previewRender: (plainText) => {
            return renderToStaticMarkup(
                <ReactMarkdown>{plainText}</ReactMarkdown>,
            );
        },
    });
    EasyMDE.toggleSideBySide(easymde);

    return easymde;
}
