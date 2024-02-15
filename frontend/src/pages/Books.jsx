import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:500/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:500/books/${id}`);
            setBooks(books.filter(book => book.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const filteredBooks = books.filter(book => {
        if (selectedGenre && book.genre !== selectedGenre) {
            return false;
        }
        if (searchTerm && !book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    return (
        <div>
            <nav className="navbar">
                <div className="left">
                    <h1>KABITA'S FAVORITE BOOKS</h1>
                </div>
                <div className="middle">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="right">
                    <select value={selectedGenre} onChange={handleGenreChange}>
                        <option value="">All Genres</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="YA">YA</option>
                    </select>
                    <button><Link to="/add">Add New Book</Link></button>
                </div>
            </nav>
            <div className="books">
                {filteredBooks.map(book => (
                    <div className='book' key={book.id}>
                        {book.image && <img src={book.image} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.review}</p>
                        <div className="details">
                            <span className='genre'>{book.genre}</span>
                            <span className="rating">{book.rating}</span>
                        </div>
                        <div className="actions">
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                         {/* Added inline style to remove underline and make text white */}
                         <button className='update'><Link to={`/update/${book.id}`} style={{textDecoration: 'none', color: 'white'}}>Update</Link></button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
