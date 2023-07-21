import {useState} from 'react';
import axios from 'axios';
import Router from 'next/router';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  var onSuccess = () => {
      Router.push('/');
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        setErrors([]);
        const {data} = await axios.post('/api/users/signin', {
            email,
            password
        });
        if(onSuccess){
            onSuccess(data);
        }
        return data;
    }
    catch(err){
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
    }
  }
  const renderedErrors = errors.map((err) => {
      return <div className="alert alert-danger">
        <h3>OwO?!!</h3>
          <div className="my-0" key={err.message}>
            {err.message}
          </div>
        </div>
  });

  const emailError = errors.find((err) => {
      return err.field === 'email';
  });

  const passwordError = errors.find((err) => {
      return err.field === 'password';
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signin</h1>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        {(emailError && !passwordError) && renderedErrors}
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"/>
      </div>
      {(passwordError && !emailError) && renderedErrors}
      <button type="submit" className="btn btn-primary">Signin</button>
      {(passwordError && emailError) && renderedErrors}
      {(!passwordError && !emailError) && renderedErrors}
    </form>
  );
};

export default signup;
