import React, { useState } from 'react'

const initialFormValues = {
    name: '',
    email: ''
}

export default function AddFriend (props) {
const [values , setValues] = useState(initialFormValues)
const { postFriends } = props

const onChange = evt => {
    const { id, value } = evt.target
    setValues({...values, [id]: value}) 
}
    
const onSubmit = evt => {
    evt.preventDefault()
    postFriends(values)
}

    return (
        <div>
            <h1>ADD FRIEND</h1>
            <form onSubmit={onSubmit}>
                <input
                id="name"
                value={values.name}
                placeholder="Enter Friend Name"
                onChange={onChange}
                />
                <input
                id="email"
                value={values.email}
                placeholder="Enter Friend Email"
                onChange={onChange}
                />
                <button>SUBMIT</button>
            </form>

        </div>
    )
}