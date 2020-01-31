import React from "react";
import { axiosWithAuth } from '../api';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = React.useState({username: '', password: ''});
  
  function handleChange(e) {
    setCredentials( {
        ...credentials,
        [e.target.name]: e.target.value,
      }
    )
  }

  function login(e) {
    e.preventDefault();

    console.log(credentials);

    axiosWithAuth().post('http://localhost:5000/api/login', credentials)
    .then(res => {
        localStorage.setItem('token', res.data.payload);
        console.log('resp', res);
        props.history.push('/bubbles');
    })
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Login below</p>

      <div className='login'>
            <form onSubmit={(evt) => login(evt)}>
                <label>
                    Login: 
                    <input type='text' name='username' value={credentials.username} onChange={(evt) => handleChange(evt)} />
                </label>
                <label>
                    Password: 
                    <input type='password' name='password' value={credentials.password} onChange={(evt) => handleChange(evt)} />
                </label>
                <button>Login</button>
            </form>

        </div>
    </>
  );
};

export default Login;
