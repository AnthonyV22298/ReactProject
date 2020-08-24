import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAttempt } from '../actions/userActions';
import ErrorBanner from './ErrorBanner';



const LoginPage = () => {
    //declare input variable and initial state of input fields
    const [inputs, setInputs] = useState({
        ssn: '',
        firstname: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { ssn, firstname } = inputs;
    const user = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    //handles input change and updates the field of the regarding property: value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    //prevent the default action from happening
    //sets submited to true to if all fields are set before submitting login atempt
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (ssn && firstname) {
            dispatch(loginAttempt(inputs));
        }

    };
//checks if the user is logged in, redirects home if true
//verify the input fields are both set before dispatching login
    return (
        <div className="col-lg-8 offset-lg-2">
        {user.loggedIn === true
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
                        {user.loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                </div>
                {
                    user.loginFailed &&
                    <ErrorBanner>
                        SSN or Password is incorrect!
                    </ErrorBanner>
                }
            </form>
        }
        </div>
    );
}
export default LoginPage;
