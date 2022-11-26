import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { EasyEditer } from 'editor/editor';

import 'styles/editor.css';
import 'easymde/dist/easymde.min.css';
import mdxComponents from 'editor/mdxComponent';
import toolbarOption from 'editor/toolbar';

const Textarea = styled.textarea`
    min-width: 100%;
    min-height: 100%;
`;

interface MDXEditorType {
    guideLine: string;
}

export default function MDXEditor({ guideLine }: MDXEditorType) {
    const editorRef = useRef(null);
    const [, setEditor] = useState<any>(null);

    useEffect(() => {
        setEditor(
            EasyEditer({
                easymde: { element: editorRef.current },
                mdxComponents,
                toolbar: toolbarOption,
            }),
        );
    }, []);

    return (
        <div className="markdown-body">
            <Textarea ref={editorRef} id="editor" defaultValue={guideLine} />
        </div>
    );
}
