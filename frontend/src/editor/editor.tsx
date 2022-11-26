/* @jsxRuntime automatic @jsxImportSource react */
import React, { createElement } from 'react';

import EasyMDE from 'easymde';
import { renderToStaticMarkup } from 'react-dom/server';
import { evaluateSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

function generate(body: string) {
    const mdx = evaluateSync(body, {
        ...(runtime as any),
    }).default;

    return renderToStaticMarkup(createElement(mdx));
}
const mdxContent = `
export const planet = 'World'
export const Highlight = ({children, color}) => (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );

`;

export default function mdxEditor({
    toolbar = null,
    easymde: easymdeConfig = {},
}: any) {
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
        previewRender: (plainText: any) => {
            return generate(mdxContent + plainText);
        },
    });
    EasyMDE.toggleSideBySide(easymde);

    return easymde;
}
