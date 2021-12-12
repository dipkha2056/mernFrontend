import {useState, useEffect} from 'react'
import axios from 'axios'


function AccountantsAPI() {
    const [accountants, setAccountants] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getAccountants = async () => {
            const res = await axios.get(`/accountants?limit=${page*9}&${category}&${sort}&name[regex]=${search}`)
            setAccountants(res.data.accountants)
            setResult(res.data.result)
        }
        getAccountants()
    },[callback, category, sort, search, page])
    
    return {
        accountants: [accountants, setAccountants],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default AccountantsAPI
