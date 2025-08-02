import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        // ✅ Print updated values in the console
        console.log("Updated Signup Details:", { ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            console.log("Submitting Data:", values); // ✅ Log final data

            // ✅ Use HTTPS for secure requests
          /*  axios.post('https://localhost:8081/signup', values)  
                .then((res) => {
                    navigate('/');
                })
                .catch((err) => console.log(err)); */
                axios.post('http://localhost:8081/signup', values)
    .then((res) => {
        console.log("Response from server:", res.data);
        navigate('/');
    })
    .catch((err) => console.error("Axios Error:", err.response || err));

        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className='bg-white p-3 rounded w-25'>
                {/* ✅ Added autoComplete="off" to prevent autofill */}
                <form onSubmit={handleSubmit} autoComplete="off">  
                    <h2>Sign-Up</h2>

                    <div className='mb-3'>
                        {/* ✅ Corrected htmlFor usage */}
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input 
                            id="name" 
                            type='text' 
                            placeholder='Enter name' 
                            name='name' 
                            autoComplete="name"  
                            onChange={handleInput} 
                            className='form-control rounded-0'
                        />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            id="email" 
                            type='email' 
                            placeholder='Enter email' 
                            name='email' 
                            autoComplete="email"  
                            onChange={handleInput} 
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            id="password" 
                            type='password' 
                            placeholder='Enter password' 
                            name='password' 
                            autoComplete="new-password"  
                            onChange={handleInput} 
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <p>You agree to our terms and policies</p>

                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
