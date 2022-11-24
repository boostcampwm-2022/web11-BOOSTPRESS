import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Grid } from './mdx/Grid';
import defaultMarkdownValue from './default.md';
import mdxEditor from './editor';

const Textarea = styled.textarea`
    min-width: 100vw;
    min-height: 100vh;
`;

const components = [
    {
        tagname: 'Grid',
        component: Grid,
        title: 'Grid',
        description: 'Display content next to each other',
        icon: 'grip-horizontal',
        demo: `<Grid>
  <img src="https://source.unsplash.com/weekly?water" alt="" />
  <img src="https://source.unsplash.com/weekly?nature" alt="" />
  <img src="https://source.unsplash.com/weekly?air" alt="" />
</Grid>`,
    },
];

const replacements = {
    h1: ({ children, ...props }: any) => (
        <h1 style={{ color: 'tomato' }} {...props}>
            {children}
        </h1>
    ),
};

export default function Test() {
    const editorRef = useRef(null);
    const [editor, setEditor] = useState<any>(null);

    useEffect(() => {
        setEditor(
            mdxEditor({
                components,
                replacements,
                easymde: { element: editorRef.current },
            }),
        );
    }, []);

    return <Textarea ref={editorRef} id="editor" defaultValue={`# 안녕`} />;
}
