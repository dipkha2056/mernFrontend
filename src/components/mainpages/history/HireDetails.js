import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function HireDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [hireDetails, setHireDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(accountant =>{
                if(accountant._id === params.id) setHireDetails(accountant)
            })
        }
    },[params.id, history])


    if(hireDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{hireDetails.address.recipient_name}</td>
                        <td>{hireDetails.address.line1 + " - " + hireDetails.address.city}</td>
                        <td>{hireDetails.address.postal_code}</td>
                        <td>{hireDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Accountants</th>
                        <th>Book</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hireDetails.hire.map(accountant =>(
                        <tr key={accountant._id}>
                            <td><img src={accountant.images.url} alt="" /></td>
                            <td>{accountant.name}</td>
                            <td>{accountant.book}</td>
                            <td>$ {accountant.cost * accountant.book}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default HireDetails