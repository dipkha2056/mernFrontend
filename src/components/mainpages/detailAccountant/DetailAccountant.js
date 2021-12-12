import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import AccountantHire from '../accountants/utils/accountantHire/AccountantHire'


function DetailAccountant() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [accountants] = state.accountantsAPI.accountants
    const addHire = state.userAPI.addHire
    const [detailAccountant, setDetailAccountant] = useState([])

    useEffect(() =>{
        if(params.id){

            accountants.forEach(accountant => {
                if(accountant._id === params.id) setDetailAccountant(accountant)
            })
        }
    },[params.id, accountants])

    if(detailAccountant.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailAccountant.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailAccountant.name}</h2>
                        <h6>#id: {detailAccountant.Accountant_id}</h6>
                    </div>
                    <span>$ {detailAccountant.cost}</span>
                    <p>{detailAccountant.description}</p>
                    <p>Sold: {detailAccountant.book}</p>
                    <Link to="/hire" className="cart"
                    onClick={() => addHire(detailAccountant)}>
                        Hire Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related Accountant</h2>
                <div className="accountants">
                    {
                        accountants.map(accountant => {
                            return accountant.category === detailAccountant.category 
                                ? <AccountantHire key={accountant._id} accountant={accountant} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailAccountant
