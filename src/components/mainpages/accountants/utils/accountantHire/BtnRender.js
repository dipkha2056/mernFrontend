import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../../GlobalState'

function BtnRender({accountant, deleteAccountant}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addHire = state.userAPI.addHire

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteAccountant(accountant._id, accountant.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_accountant/${accountant._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addHire(accountant)}>
                        Buy
                    </Link>
                    <Link id="btn_view" to={`/detail/${accountant._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
