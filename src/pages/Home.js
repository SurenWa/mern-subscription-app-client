import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import PriceCard from '../components/cards/PriceCard'
import { UserContext } from '../context'

const Home = () => {
    const history = useNavigate()
    const [state, setState] = useContext(UserContext)
    const [prices, setPrices] = useState([])
    const [userSubscriptions, setUserSubscriptions] = useState([])

    useEffect(() => {        
        fetchPrices()
    }, [])

    useEffect(() => {
        let result = [];
        const check = () => 
            state && state.user && state.user.subscriptions && state.user.subscriptions.map((sub) => {
                result.push(sub.plan.id)
            })
            check();
            setUserSubscriptions(result)
    }, [state && state.user])
    

    const fetchPrices = async () => {            
        const { data } = await axios.get("/prices")
        console.log("Prices get request", data)
        setPrices(data)
    }    

    const handleSubscription = async (e, price) => {
        e.preventDefault()
        if(userSubscriptions && userSubscriptions.includes(price.id)) {
            history(`/${price.nickname.toLowerCase()}`)
            return
        }
        //console.log("Plan clicked", price.id)
        if(state && state.token) {
            const { data } = await axios.post("/create-subscription", {
                priceId: price.id
            })
            window.open(data)
        } else {
            history("/register")
        } 
    }   
    
    
    return (
        <div className="container-fluid">
            <div className="row col-md-6 offset-md-3 text-center">
                <h1 className='pt-5 fw-bold'>
                    Explore the right plan for your business
                </h1>
                <p className="lead pb-4">
                    Choose a plan that suits you best
                </p>                
            </div>  

            <div className="row pt-5 mb-3 text-center">
                    {prices && prices.map((price) => {
                            return (
                                <PriceCard    
                                    key={price.id}
                                    price={price}
                                    handleSubscription={handleSubscription}
                                    userSubscriptions={userSubscriptions}
                                />
                            )                        
                        
                    })}                  
            </div>
        </div>
    )
}

export default Home