import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors); 
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign-In</h2>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            value={values.email}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            name='password'
                            value={values.password}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
                    <p>You agree to our terms and policies</p>

                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0'>
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
