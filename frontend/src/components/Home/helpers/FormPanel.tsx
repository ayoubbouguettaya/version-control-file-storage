import React, { useState } from 'react'

import styles from '../home.module.css'
import useForm from '../../Hook/useForm'
import { useSWRConfig } from 'swr'

type Props = {
    content: IValue,
    author: string
}

interface IValue {
    [key: string]: string
}

const FormPanel = (props: Props) => {
    const { mutate } = useSWRConfig()

    const [values, handleOnChange, setValues] = useForm<IValue>(props.content)
    const [params, OnChangeNewParamsValue, setParams] = useForm({ newParams: "---" })
    const [commitMessage, OnChangeNewcommitMessageValue, setcommitMessage] = useForm({ newcommitMessage: "commit message" })

    const [showModal, setShowModal] = useState(false)

    const handleAddNewParams = (key: string) => {
        if (values[key]) {
            setParams({ newParams: '---' });
            return false;
        }
        setValues((previousValues) => ({ ...previousValues, [key]: key }));
        setParams({ newParams: '---' });
        setShowModal(false)
    }

    const saveData = (data: any) => {
        const stringifiedData = JSON.stringify({ data: JSON.stringify(data), commitMessage: commitMessage.newcommitMessage, author: props.author })

        fetch('http://localhost:3000/data', {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: stringifiedData
        })
        
        mutate('http://localhost:3000/data')
        mutate('http://localhost:3000/commit-history')

    }

    return (
        <div className={styles.form_panel}>
            <div className={styles.header}>
                <div className={styles.row}>
                    <input placeholder='comment' name='newcommitMessage' onChange={OnChangeNewcommitMessageValue} value={commitMessage.newcommitMessage} />
                    <button onClick={() => saveData(values)} >Save</button>
                </div>
            </div>
            <form>
                {Object.entries(values).map(([Itemkey, Itemvalue], index) => (
                    <div key={Itemkey} className={styles.form_item}>
                        <label htmlFor={Itemkey}>
                            {Itemkey}
                        </label>
                        <input key={index} name={Itemkey} value={Itemvalue} placeholder={Itemkey} onChange={handleOnChange} />
                    </div>
                ))}
                {showModal ? (
                    <div className={styles.modal_overflow}>
                        <div className={styles.modal}>
                            <input name='newParams' onChange={OnChangeNewParamsValue} value={params.newParams} />
                            <button onClick={() => handleAddNewParams(params.newParams)} >Add</button>
                            <button onClick={() => setShowModal(false)} >Close</button>
                        </div>
                    </div>
                ) : (
                    <button style={{ float: 'right' }} onClick={() => setShowModal(true)} >Add New Attribute</button>
                )}
            </form>
        </div>
    )
}

export default FormPanel