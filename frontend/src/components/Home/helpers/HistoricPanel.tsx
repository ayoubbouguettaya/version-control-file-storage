import  { useState } from 'react'
import {Link} from "react-router-dom"
import styles from '../home.module.css'

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


const HistoricPanel = (props: Props) => {
  
    return (
        <div className={styles.historic_panel}>
            <h3> History </h3>
            <ul>
                {props.history.items.map((item) => (
                    <li key={item.hash}>
                        <p>CommitHash: {item.hash}</p>
                        <p>@{item.author_name} | <i> <small> {item.date}</small></i></p>
                        <blockquote>  {item.message} </blockquote>
                        <div>
                            <button>RollBack</button>
                           <Link to={`/show/${item.hash}`}>
                            <button  >Show</button>
                           </Link>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default HistoricPanel