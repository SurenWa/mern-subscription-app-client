import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SyncOutlined } from '@ant-design/icons'

import { UserContext } from '../context';

const StripeSuccess = () => {
    const [state, setState] = useContext(UserContext)
    const history = useNavigate();

    useEffect(() => {
        getSubscriptionStatus()
    }, [])

    const getSubscriptionStatus = async () => {
        const { data } = await axios.get('/subscription-status')
        console.log('SUBSCRIPTION STATUS', data)
        if(data && data.length === 0) {
            history("/")
        } else {
            //update user in local storage
            const auth = JSON.parse(localStorage.getItem("auth"))
            auth.user = data
            localStorage.setItem("auth", JSON.stringify(auth))
            //update user in context
            setState(auth)
            setTimeout(() => {
                history("/account")
            }, 1000)            
        }
    }
    
    return (
        <div 
            className='d-flex justify-content-center fw-bold'
            style={{height: "90vh"}}
        >
            <div
                className='d-flex align-items-center'
            >
                <SyncOutlined 
                    spin style={{ fontSize: "50px" }}
                />
            </div>
        </div>
    )
}

export default StripeSuccess