import React, { useState } from 'react'

const initialFormValues = {
    username: '',
    password: ''
}

export default function Login (props) {
    const [values, setValues] = useState(initialFormValues)
    const { login } = props

    const onChange = evt => {
        const { id, value } = evt.target
        setValues({...values, [id]: value})
    }

    const onSubmit = evt => {
        evt.preventDefault()
        login(values)
    }

    return (
        <form id="loginScreen" onSubmit={onSubmit}>
            <h1>LOGIN</h1>
            <input
            value = {values.username}
            placeholder = "Enter Username"
            id = "username"
            onChange = {onChange}
            />
            <input
            value = {values.password}
            placeholder = "Enter Password"
            id = "password"
            onChange = {onChange}
            />
            <button>SUBMIT</button>
        </form>
    )
}