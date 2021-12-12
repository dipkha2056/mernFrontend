import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../accountants/utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    accountant_id: '',
    name: '',
    cost: 0,
    description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
    category: '',
    _id: ''
}

function CreateAccountant() {
    const state = useContext(GlobalState)
    const [accountant, setAccountant] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [accountants] = state.accountantsAPI.accountants
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.accountantsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            accountants.forEach(accountant => {
                if(accountant._id === param.id) {
                    setAccountant(accountant)
                    setImages(accountant.images)
                }
            })
        }else{
            setOnEdit(false)
            setAccountant(initialState)
            setImages(false)
        }
    }, [param.id, accountants])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setAccountant({...accountant, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/accountants/${accountant._id}`, {...accountant, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/accountants', {...accountant, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="add_accountant">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="accountant_id">Accountant ID</label>
                    <input type="text" name="accountant_id" id="accountant_id" required
                    value={accountant.accountant_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="title" required
                    value={accountant.name} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="cost">Cost</label>
                    <input type="number" name="cost" id="cost" required
                    value={accountant.cost} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={accountant.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={accountant.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateAccountant
