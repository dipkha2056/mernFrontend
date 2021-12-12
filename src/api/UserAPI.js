import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [hire, setHire] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setHire(res.data.hire)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addHire = async (accountant) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = hire.every(accountant =>{
            return accountant._id !== accountant._id
        })

        if(check){
            setHire([...hire, {...accountant, book: 1}])

            await axios.patch('/addhire', {hire: [...hire, {...accountant, book: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This accountant has been added to hire.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        hire: [hire, setHire],
        addHire: addHire,
        history: [history, setHistory]
    }
}

export default UserAPI
 