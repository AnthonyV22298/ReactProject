"use strict"

import React from 'react';
import PropTypes from 'prop-types';

const BookRender = ({ bookData }) => {

    function createBookRow(book){
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
            </tr>
        );
    }

    let content = '';

    if(!bookData || bookData.requestPending){
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }
    

    if(bookData && bookData.requestSucessful){
        content = 
            (<table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.books.map((book) => createBookRow(book))}
                </tbody>    
            </table>)
    }

    if(bookData && bookData.requestFailed){
        content = 
        (
            <div className="alert alert-danger" role="alert">
                Error while loading books!
            </div>
        )
    }
        
    return(
        <div>
            <h1>Books</h1>
            {content}
        </div>
    );
}

BookRender.propTypes = {
    bookData: PropTypes.object
};

export default BookRender;
