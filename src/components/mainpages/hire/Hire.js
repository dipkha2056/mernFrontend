import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Hire() {
    const state = useContext(GlobalState)
    const [hire, setHire] = state.userAPI.hire
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = hire.reduce((prev, accountant) => {
                return prev + (accountant.cost * accountant.book)
            },0)

            setTotal(total)
        }

        getTotal()

    },[hire])

    const addToHire = async (hire) =>{
        await axios.patch('/addhire', {hire}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        hire.forEach(accountant => {
            if(accountant._id === id){
                accountant.book += 1
            }
        })

        setHire([...hire])
        addToHire(hire)
    }

    const decrement = (id) =>{
        hire.forEach(accountant => {
            if(accountant._id === id){
                accountant.book === 1 ? accountant.book = 1 : accountant.bokk -= 1
            }
        })

        setHire([...hire])
        addToHire(hire)
    }

    const removeHire = id =>{
        if(window.confirm("Do you want to delete this Hire?")){
            hire.forEach((accountant, index) => {
                if(accountant._id === id){
                    hire.splice(index, 1)
                }
            })

            setHire([...hire])
            addToHire(hire)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/payment', {hire, paymentID, address}, {
            headers: {Authorization: token}
        })

        setHire([])
        addToHire([])
        alert("You have successfully placed an hire.")
    }


    if(hire.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>hire Empty</h2> 

    return (
        <div>
            {
                hire.map(accountant => (
                    <div className="detail cart" key={accountant._id}>
                        <img src={accountant.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{accountant.name}</h2>

                            <h3>$ {accountant.cost * accountant.book}</h3>
                            <p>{accountant.description}</p>
                            

                            <div className="amount">
                                <button onClick={() => decrement(accountant._id)}> - </button>
                                <span>{accountant.book}</span>
                                <button onClick={() => increment(accountant._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeHire(accountant._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Hire