import React, { useState } from 'react'
import useForm from '../../Hook/useForm'

import styles from '../home.module.css'
type Props = { userName: string, setUserName: React.Dispatch<React.SetStateAction<string>> }

const AuthenticatedUserPanel = (props: Props) => {
    const [values, handleOnChange] = useForm({ userName: props.userName })
    const [editMode, seteditMode] = useState(false)

    const saveNewUser = (newName) => {
        props.setUserName(newName)
        seteditMode(false)
    }
    return (
        <div className={styles.row}>
            <h3>Signin User <span style={{ color: 'green' }}> @{props.userName}</span></h3>
            {editMode ?
                <div className={styles.row}>
                    <input name={"userName"} value={values.userName} placeholder={"userName"} onChange={handleOnChange} />
                    <button onClick={() => saveNewUser(values.userName)}>
                        save
                    </button>
                </div>
                :
                <button onClick={() => seteditMode(true)} >
                    Change User
                </button>
            }
        </div>
    )
}

export default AuthenticatedUserPanel