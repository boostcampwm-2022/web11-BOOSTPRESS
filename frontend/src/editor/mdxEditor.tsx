import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import mdxEditor from './editor';

import 'styles/editor.css';
import 'easymde/dist/easymde.min.css';

const Textarea = styled.textarea`
    min-width: 100%;
    min-height: 100%;
`;

export default function MDXEditor() {
    const editorRef = useRef(null);
    const [editor, setEditor] = useState<any>(null);

    useEffect(() => {
        setEditor(
            mdxEditor({
                easymde: { element: editorRef.current },
            }),
        );
    }, []);

    return (
        <div className="markdown-body">
            <Textarea ref={editorRef} id="editor" defaultValue={`# 안녕`} />
        </div>
    );
}
