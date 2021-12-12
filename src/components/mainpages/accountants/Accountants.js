import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import AccountantHire from './utils/accountantHire/AccountantHire'
import Loading from './utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Accountants() {
    const state = useContext(GlobalState)
    const [accountants, setAccountants] = state.accountantsAPI.accountants
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.accountantsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        accountants.forEach(accountant => {
            if(accountant._id === id) accountant.checked = !accountant.checked
        })
        setAccountants([...accountants])
    }

    const deleteAccountant = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteAccountant = axios.delete(`/accountants/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteAccountant
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        accountants.forEach(accountant => {
            accountant.checked = !isCheck
        })
        setAccountants([...accountants])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        accountants.forEach(accountant => {
            if(accountant.checked) deleteAccountant(accountant._id, accountant.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="products">
            {
                accountants.map(accountant => {
                    return <AccountantHire key={accountant._id} accountant={accountant}
                    isAdmin={isAdmin} deleteAccountant={deleteAccountant} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {accountants.length === 0 && <Loading />}
        </>
    )
}

export default Accountants
