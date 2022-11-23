import { useCallback, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import SimpleMdeReact from 'react-simplemde-editor';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import ReactMarkdown from 'react-markdown';

const Editor = () => {
    const [value, setValue] = useState('initial value');
    const onChange = useCallback((value: string) => setValue(() => value), []);

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
        <SimpleMdeReact options={options} value={value} onChange={onChange} />
    );
};

export default Editor;
