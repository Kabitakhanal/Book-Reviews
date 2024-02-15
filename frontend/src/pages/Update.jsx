import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../add.css'

const Update = () => {
    const [book,setBook] = useState({
        title:"",
        review:"",
        rating:null,
        image:"",
        genre:"",
    });

    const navigate = useNavigate()
    const location=useLocation()

    const bookId= location.pathname.split("/")[2]

    const handleChange = (e) =>{
        setBook((prev)=> ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:500/books/"+bookId, book)
            navigate("/")

        }catch(err){
            console.log(err)

        }
    };

    console.log(book)
  return (
    <div className='form-container'>
    <div className='form'>
        <h1>Update Book</h1>
        <input type='text' placeholder='Title' onChange={handleChange} name="title" />
        <input type='text' placeholder='Review' onChange={handleChange} name='review' />
        <input type='text' placeholder='Genre' onChange={handleChange} name='genre' />
        <input type='number' placeholder='Rating' onChange={handleChange} name='rating' />
        <input type='text' placeholder='Image' onChange={handleChange} name='image' />

        <button className='formButton' onClick={handleClick}>Update</button>
        <Link to="/" className="backButton">Go back to Home</Link>
        
    </div>
    </div>
  )
}

export default Update