import React from 'react';

export default function SecureForm(props){
    const {
        handleChange,
        handleSubmit,
        frmTxt,
        input: username,password
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
            placeholder="Username"/>
            <input
                type="text"
                value={password}
                name="password"
                onChange={handleChange}
            placeholder="Password"/>
            <button>{frmTxt}</button>
        </form>
    )
}