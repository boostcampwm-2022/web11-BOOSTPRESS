/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import SimpleMdeReact from 'react-simplemde-editor';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import ReactMarkdown from 'react-markdown';
import 'styles/editor.css';

interface EditorType {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ content, setContent }: EditorType) => {
    const [renderCtx, setRenderCtx] = useState<any>();

    const onChange = useCallback(
        (value: string) => setContent(() => value),
        [],
    );

    const options = useMemo(
        () =>
            ({
                sideBySideFullscreen: false,
                autofocus: true,
                spellChecker: false,

                previewRender(value) {
                    return renderToString(
                        <ReactMarkdown>{value}</ReactMarkdown>,
                    );
                },
            } as EasyMDE.Options),
        [],
    );

    return (
        <SimpleMdeReact options={options} value={content} onChange={onChange} />
    );
};

export default Editor;
