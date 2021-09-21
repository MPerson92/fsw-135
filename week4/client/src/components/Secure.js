import React, { useState, useContext } from 'react'
import SecureForm from './SecureForm'
import { UserContext } from './User'

const initInputs = { username: "", password: "" }

export default function Secure(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login } = useContext(UserContext)

  function handleChange(e){
        const {name, value} = e.target 
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

  function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm() {
        setToggle(prev => !prev)
    }

    return(
        <div>
            <h1>Rock The Vote</h1>

            { !toggle ?
                <>
                    <SecureForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        frmTxt="Sign Up"
                    />
                   <p onClick={toggleForm}>Are you a Member?</p>
                </>
            :
            <div>
                <>
                    <SecureForm
                        handleLogin={handleLogin}
                        inputs={inputs}
                        frmTxt="Login"
                    />
                    <p onClick={toggleForm}> Please Login with your correct credentials</p>
                </>
            </div>
            }
        </div>
    )
}
