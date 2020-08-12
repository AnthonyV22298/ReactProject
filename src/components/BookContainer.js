"use strict"

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as bookActions from '../actions/bookActions';
import BookRender from './BookRender';

const BookContainer = (props) => {

    useEffect(() => {
        const { actions } = props;
        actions.readBooks();
    }, [] );

   
    return(
        <div>
            <BookRender {...props} />
        </div>
    );
}

function mapStateToProps(state){
    return {
        bookData: state.bookReducer.bookData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(bookActions, dispatch)
    }
}

BookContainer.propTypes = {
    actions: PropTypes.object
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps
    )(BookContainer);
