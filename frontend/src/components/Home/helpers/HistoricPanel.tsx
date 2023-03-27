import React, { useEffect, useState } from 'react'
// @ts-ignore
import { parseDiff, Diff, Hunk } from 'react-diff-view';

import styles from '../home.module.css'
import useSWR from 'swr'
import { fetcher } from '..'

type Props = {
    history: {
        items: {
            hash: string,
            author_name: string,
            date: string,
            message: string
        }[],
        pageLength: number;
        page: number;
        maxPages: number;
        size: number;
        totalCount: number;
    }
}

const renderFile = ({ oldRevision, newRevision, type, hunks }: any) => (
    <Diff key={oldRevision + '-' + newRevision} viewType="unified" diffType={type} hunks={hunks}>
        {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
);

const DiffModal = (props: { commitHash: string, close: () => void }) => {
    const { data: diff, error, isLoading } = useSWR(`http://localhost:3000/data/${props.commitHash}`, fetcher)
    const [files, setfiles] = useState([])

    useEffect(() => {
        if (diff)
            setfiles(parseDiff(diff.changes))
    }, [diff])

    if (error) return (<p>{error}</p>)
    if (isLoading) return (<p>{isLoading}</p>)


    return (<div className={styles.modal_overflow}>
        <div className={styles.modal}>
            <div  className={styles.diff_modal} >
                <button onClick={() => props.close()}>Close</button>
                {files.map(renderFile)}
            </div>
        </div>
    </div>)
}

const HistoricPanel = (props: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [currentHash, setcurrentHash] = useState("")

    const handleclose = () => {
        setShowModal(false)
        setcurrentHash("")
    }

    const handleShw = (hash: string) => {
        setShowModal(true)
        setcurrentHash(hash)
    }

    return (
        <div className={styles.historic_panel}>
            <h3> History </h3>
            <ul>
                {showModal && <DiffModal close={handleclose} commitHash={currentHash} />}
                {props.history.items.map((item) => (
                    <li key={item.hash}>
                        <p>CommitHash: {item.hash}</p>
                        <p>@{item.author_name} | <i> <small> {item.date}</small></i></p>
                        <blockquote>  {item.message} </blockquote>
                        <div>
                            <button>RollBack</button>
                            {!showModal && (
                                <button onClick={() => handleShw(item.hash)} >Show</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default HistoricPanel