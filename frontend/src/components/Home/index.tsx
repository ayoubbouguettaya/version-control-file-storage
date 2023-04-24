import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

import styles from './home.module.css'
import HistoricPanel from './helpers/HistoricPanel'
import AuthenticatedUserPanel from './helpers/AuthenticatedUserPanel'
import EditorPanel from './helpers/EditorPanel'

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = {}

const HomeComponent = (props: Props) => {
  const [userName, setUserName] = useState("ayoubbouguettaya")
  const { data: content, error, isLoading } = useSWR('http://localhost:3000/data', fetcher)
  const { data: history, error: errorHistory, isLoading: isLoadingHistory } = useSWR('http://localhost:3000/commit-history', fetcher)

  return (
    <div className={styles.home_container}>
      <h2>Playarround with file storage system and Git for versionning management</h2>
      <AuthenticatedUserPanel userName={userName} setUserName={setUserName} />
      <div className={styles.main}>

        {!errorHistory && !isLoadingHistory && history ?
          <HistoricPanel history={history} /> :
          <div className={styles.historic_panel}>
            <p>Is Loading</p>
            {error && <p style={{ color: "red" }} >{typeof error === "string" ? error : JSON.stringify(error)}</p>}
          </div>}
        {!error && !isLoading && content ?
          <EditorPanel data={content} author={userName} /> :
          <div className={styles.form_panel}>
            <p>Is Loading</p>
            {error && <p style={{ color: "red" }} >{typeof error === "string" ? error : JSON.stringify(error)}</p>}
          </div>}
      </div>
    </div>
  )
}

export default HomeComponent;