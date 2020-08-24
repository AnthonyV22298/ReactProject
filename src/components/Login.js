import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAttempt } from '../actions/userActions';



const LoginPage = () => {
    const [inputs, setInputs] = useState({
        ssn: '',
        firstname: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { ssn, firstname } = inputs;
    const loggingIn = useSelector(state => state.loginReducer.loggingIn);
    const loggedIn = useSelector(state => state.loginReducer.loggedIn);
    const dispatch = useDispatch();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (ssn && firstname) {
            dispatch(loginAttempt(inputs));
        }

    };

    return (
        <div className="col-lg-8 offset-lg-2">
        {loggedIn === true
            ?
            <Redirect to='/'/>
            :
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>SSN</label>
                    <input type="text" name="ssn" value={ssn} onChange={handleChange} className={'form-control' + (submitted && !ssn ? ' is-invalid' : '')} />
                    {submitted && !ssn &&
                        <div className="invalid-feedback">SSN is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>firstname</label>
                    <input type="text" name="firstname" value={firstname} onChange={handleChange} className={'form-control' + (submitted && !firstname ? ' is-invalid' : '')} />
                    {submitted && !firstname &&
                        <div className="invalid-feedback">firstname is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        }
        </div>
    );
}
export default LoginPage;
