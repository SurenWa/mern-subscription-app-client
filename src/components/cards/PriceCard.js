import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context'


const PriceCard = ({ price, handleSubscription, userSubscriptions }) => {
    const [state] = useContext(UserContext)

    const dynamicDescription = () => {
        if(price.nickname === 'Basic') {
            return "5 exclusive stocks"
        }
        else if(price.nickname === 'Standard') {
            return "10 exclusive stocks"
        }
        else if(price.nickname === 'Premium') {
            return "15 exclusive stocks"
        }
    }

    const buttonStyle = () => {
        return (
            price.nickname === 'Basic' ? 'btn-outline-danger' : 'btn-danger'
        )
    }

    const headerStyle = () => {
        return (
            price.nickname === 'Premium' ? 'bg-danger text-light' : ''
        )
    }

    const borderStyle = () => {
        return (
            price.nickname === 'Premium' ? 'border-danger' : ''
        )
    }

    const buttonText = () => {
        return state && state.token ? 'Purchase Plan' : 'Sign Up'
    }


    return (        
        <div className="col">
            <div className="card">
                <div className={`card mb-4 rounded-3 shadow-sm ${borderStyle()}`}>
                    <div className={`card-header py-3 ${headerStyle()}`}>
                        <h4 className="my-0 fw-normal">
                            {price.nickname}
                        </h4>
                    </div>

                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                            {(price.unit_amount / 100).toLocaleString("en-US", {
                                style: 'currency',
                                currency: "USD"
                            })}<small className='text-muted fw-light'>/mo
                            </small>
                        </h1>
                        <ul className='list-unstyled mt-3 mb-4'>
                            <li className='fw-bold'>
                                {dynamicDescription()} 
                            </li>  
                            <li>
                                Free Market Analysis 
                            </li>  
                            <li>
                                Email Support 
                            </li>  
                            <li>
                                Help Center Access
                            </li>                          
                        </ul>

                        {/**<pre>{JSON.stringify(price, null, 4)}</pre> */}
                        
                        {/**<Link to="/register"> */}
                            <button
                                onClick={(e) => handleSubscription(e, price)}
                                className={`w-100 btn btn-lg ${buttonStyle()}`}
                            >
                                {userSubscriptions && userSubscriptions.includes(price.id) ? "Access Plan" : buttonText()}
                            </button>
                        {/**</Link>*/}
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default PriceCard