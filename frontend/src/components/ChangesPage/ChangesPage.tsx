import { useParams } from 'react-router-dom';
type Props = {}
import React, { useEffect, useState } from 'react'
// @ts-ignore
import { parseDiff, Diff, Hunk,Decoration } from 'react-diff-view';
import useSWR from 'swr'
import { fetcher } from '../Home'

const renderFile = ({ oldRevision, newRevision, type, hunks }: any) => (
    <Diff key={oldRevision + '-' + newRevision} viewType="unified" diffType={type} hunks={hunks}>

        {hunks => hunks.map(hunk => (
            <>
                <Decoration key={'decoration-' + hunk.content}>{hunk.content}  </Decoration>
                <Hunk key={hunk.content} hunk={hunk} />
            </>
        ))}
    </Diff>
);

const ChangesPage = (props: Props) => {
    let { commitHash } = useParams();
    const { data: diff, error, isLoading } = useSWR(`http://localhost:3000/data/${commitHash}`, fetcher)
    const [files, setfiles] = useState([])

    useEffect(() => {
        if (diff)
            setfiles(parseDiff(diff.changes))
    }, [diff])
    return (
        <div>
            <h3>commit Hash #{commitHash}</h3>
            <div>
                {files.map(renderFile)}
            </div>
        </div>
    )
}

export default ChangesPage