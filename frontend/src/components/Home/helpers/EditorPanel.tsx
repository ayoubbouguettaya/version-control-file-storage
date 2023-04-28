import React, { useRef } from 'react'

import Editor, { Monaco } from '@monaco-editor/react';
import useForm from '../../Hook/useForm';
import { useSWRConfig } from 'swr';

type Props = {
    data?: string,
    author: string
}

const defaultValue = `
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: registry.k8s.io/busybox
    env:
    - name: DB_URL
      value: postgres://prod:5432
`;

const EditorPanel = (props: Props) => {
    const editorRef = useRef<Monaco>();

    function handleEditorDidMount(editor, monaco) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    }

    const { mutate } = useSWRConfig()

    const [commitMessage, OnChangeNewcommitMessageValue, setcommitMessage] = useForm({ newcommitMessage: "commit message" })

    const saveData = async () => {
        const data = editorRef?.current?.getValue()

        const body = { data, commitMessage: commitMessage.newcommitMessage, author: props.author }

        await fetch('http://localhost:3000/data', {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(body)
        })

        await mutate('http://localhost:3000/commit-history')
    }

    return (
        <div>
            <div >
                <div style={{ display: "flex", "width": "100%" }}>
                    <input
                        style={{ "width": "100%" }}
                        placeholder='comment'
                        name='newcommitMessage'
                        onChange={OnChangeNewcommitMessageValue}
                        value={commitMessage.newcommitMessage} />
                    <button onClick={() => saveData()} >Save</button>
                </div>
            </div>
            <Editor
                height="80vh"
                theme='vs-dark'
                value={props.data || defaultValue}
                defaultLanguage="yaml"
                defaultValue={defaultValue}
                onMount={handleEditorDidMount}
            />

        </div>
    )
}

export default EditorPanel