import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import mdxEditor from './editor';

const Textarea = styled.textarea`
    min-width: 100vw;
    min-height: 100vh;
`;

export default function Test() {
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
