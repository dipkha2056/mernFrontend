import React from 'react'
import BtnRender from './BtnRender'

function AccountantHire({accountant, isAdmin, deleteAccountant, handleCheck}) {

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={accountant.checked}
                onChange={() => handleCheck(accountant._id)} />
            }
            <img src={accountant.images.url} alt="" />

            <div className="product_box">
                <h2 title={accountant.name}>{accountant.name}</h2>
                <span>${accountant.cost}</span>
                <p>{accountant.description}</p>
            </div>

            
            <BtnRender accountant={accountant} deleteAccountant={deleteAccountant} />
        </div>
    )
}

export default AccountantHire
