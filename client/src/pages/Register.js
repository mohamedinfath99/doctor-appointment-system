import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();


  // form handler
  const onFinishHandeler = async (values) => {
    try {
      const res = await axios.post('/api/v1/users/register', values);

      if (res.data.success) {
        message.success('Register Successfully!')
        navigate('/login')
      }
      else {
        message.error(res.data.message);
      }

    }
    catch (error) {
      console.log(error);
      message.error('Something Went Wrong')
    }
  }



  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandeler} className="register-form">

          <h3 className='text-center'>Register Form</h3>

          <Form.Item label="Name" name="name">
            <Input type='text' required />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>

          <button className='btn btn-primary' type='submit'>Register</button>

          <Link to='/login' className='m-2 linkToLogin'>Already user login here</Link>

        </Form>
      </div>
    </>
  )
}

export default Register
