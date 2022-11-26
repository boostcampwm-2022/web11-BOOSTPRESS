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
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

/**
 *
 * @param guideLine 에디터에 가이드라인을 제시
 * @param setContent 에디터안의 값을 useState로 관리할 수있게
 * @returns
 */
export default function MDXEditor({ guideLine, setContent }: MDXEditorType) {
    const editorRef = useRef(null);
    const [, setEditor] = useState<any>(null);

    useEffect(() => {
        setEditor(
            EasyEditer({
                easymde: { element: editorRef.current },
                mdxComponents,
                toolbar: toolbarOption,
                setContent,
            }),
        );
    }, []);

    return (
        <div className="markdown-body">
            <Textarea ref={editorRef} id="editor" defaultValue={guideLine} />
        </div>
    );
}
