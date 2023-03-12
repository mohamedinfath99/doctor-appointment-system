import React from 'react';
import '../styles/LoginStyles.css';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  // form handler
  const onFinishHandeler = async (values) => {
    try {
      const res = await axios.post('/api/v1/users/login', values)

      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success('Login Succesfully')
        navigate('/')
      }
      else {
        message.error(res.data.message)
      }
    }
    catch (error) {
      console.log(error);
      message.error('Something went wrong')
    }
  }


  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandeler} className="login-form">

          <h3 className='text-center'>Login Form</h3>

          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>

          <button className='btn btn-primary' type='submit'>Login</button>

          <Link to='/register' className='m-2 linkToRegister'>Not a user Register here</Link>

        </Form>
      </div>
    </>
  )
}

export default Login;
