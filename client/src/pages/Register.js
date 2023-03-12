import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {

  // form handler
  const onFinishHandeler = (values) => {
    console.log(values);
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
