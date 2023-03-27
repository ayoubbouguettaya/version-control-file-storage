import React, { useState } from 'react';

const useForm = <T>(initialValues: T): [T, any, React.Dispatch<React.SetStateAction<T>>] => {
    const [values, setValues] = useState<T>(initialValues);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues((previousValues) => ({ ...previousValues, [event.target.name]: event.target.value }));
    }

    return ([values, handleOnChange, setValues])
}

export default useForm;
