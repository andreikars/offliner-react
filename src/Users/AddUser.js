import axios from 'axios';
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate=useNavigate()

    const [user, setUser]=useState({
      first_name: "",
      second_name: "",
      username: "",
      email: "",
      phone: "",
    });

    const{first_name, second_name, username, email, phone} = user;

    const onInputChange=(e)=>{
      setUser({...user, [e.target.name]: e.target.value})
    };

    const onSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post("http://localhost:8080/user", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Server response:", response);
        navigate("/");
      } catch (error) {
        console.error("Error during user creation:", error);
      }
    };
    
    

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-container m-4'>Register User</h2>
          <form onSubmit={(e)=>onSubmit(e)}>
          
          <div className='mb-3'>
            <label htmlFor='First name' className='form-label'>
                First name
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter your first name'
                name="first_name"
                value={first_name}
                onChange={(e)=>onInputChange(e)}
              />
          </div>
          <div className='mb-3'>
            <label htmlFor='Second name' className='form-label'>
                Second name
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter your second name'
                name="second_name"
                value={second_name}
                onChange={(e)=>onInputChange(e)}
              />
          </div>
          <div className='mb-3'>
            <label htmlFor='Username' className='form-label'>
                Username
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter your username'
                name="username"
                value={username}
                onChange={(e)=>onInputChange(e)}
              />
          </div>
          <div className='mb-3'>
            <label htmlFor='Email' className='form-label'>
                Email
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter your email'
                name="email"
                value={email}
                onChange={(e)=>onInputChange(e)}
              />
          </div>
          <div className='mb-3'>
            <label htmlFor='Phone number' className='form-label'>
                Phone number
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter your phone number'
                name="phone"
                value={phone}
                onChange={(e)=>onInputChange(e)}
              />
          </div>
          <button type='submit' className="btn btn-outline-primary">
            Submit 
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/">
            Cancel
          </Link >
          </form>
        </div>
      </div>
    </div>
  );
}
