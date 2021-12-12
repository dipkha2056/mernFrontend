import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Accountants from './accountants/Accountants'
import DetailAccountant from './detailAccountant/DetailAccountant'
import Login from './auth/Login'
import Register from './auth/Register'
import HireHistory from './history/HireHistory'
import HireDetails from './history/HireDetails'
import Hire from './hire/Hire'
import NotFound from './accountants/utils/not_found/NotFound'
import Categories from './categories/Categories'
import AddAccountant from './addAccountant/AddAccountant'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Accountants} />
            <Route path="/detail/:id" exact component={DetailAccountant} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/add_accountant" exact component={isAdmin ? AddAccountant : NotFound} />
            <Route path="/edit_accountant/:id" exact component={isAdmin ? AddAccountant : NotFound} />

            <Route path="/history" exact component={isLogged ? HireHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? HireDetails : NotFound} />

            <Route path="/hire" exact component={Hire} />


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
