import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UserContext } from '../context';


const Register = () => {
    const history = useNavigate();
    const [name, setName] = useState('Surendra')
    const [email, setEmail] = useState('cirrusminor2@gmail.com')
    const [password, setPassword] = useState('123456')
    //Context
    const [ state, setState] = useContext(UserContext)

    const handleClick = async (e) => {        
        //console.log("Button is clicked") 
        try {            
            e.preventDefault()
            const { data } = await axios.post("/register", {
                name,
                email, 
                password
            })
            console.log(data)

            if(data.error) {
                toast.error(data.error)
            } else {
                setName("")
                setEmail("")
                toast.success(`${data.user.name}.Registration successful.Please login to continue`)
                setState(data)
                localStorage.setItem('auth', JSON.stringify(data))
                history('/')
            }   


        } catch (err) {
            console.log(err)
            toast.error("Something went wrong.Try again")
        }       
    }

    return (
        <div className="d-flex justify-content-center" style={{ height: "80vh" }}>
            <div className="container align-items-center d-flex">
                <div className="row col-md-6 offset-md-3 text-center">
                    <h1 className='pt-5 fw-bold'>Register</h1>
                    <p className="lead pb-4">
                        Sign Up For Free.No credit card required.
                    </p>

                    <div className="form-group">
                        <Input
                            label="Name"
                            value={name}
                            setValue={setName}
                        />

                        <Input
                            label="Email"
                            type='email'
                            value={email}
                            setValue={setEmail}
                        />

                        <Input
                            label="Password"
                            type='password'
                            value={password}
                            setValue={setPassword}
                        />

                        <div className="d-grid">
                            <Button 
                                handleClick={handleClick}
                                type="danger"
                                text="Register"
                                size="sm"
                            />
                        </div>                        
                    </div>
                </div>                
            </div>            
        </div>
    )
}

export default Register