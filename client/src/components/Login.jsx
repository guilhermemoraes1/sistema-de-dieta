import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const LoginPage = () => {
    const {register,handleSubmit,reset}=useForm()

    const submitForm = (data) => {

        fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log("Dados saindo do login \n", data)
            if (!res.ok) {
                return res.json().then(err => {
                throw new Error(err.message)
                })
            }
            return res.json()
        })
        .then(result => {
            if (result.redirect_to) {
                window.location.href = result.redirect_to
            } else {
                alert(result.message)
            }
        })
        .catch(err => {
            alert(err.message)
        })
        reset()
    }

    return (
        <div className="container ">
            <div className='form container-main'>
                <h1>Login</h1>
                <form >
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your email"
                            {...register("email", {required:true,maxLength:25})}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password"
                            {...register("password", {required:true,minLength:8})}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as='sub' type='submit' variant='primary' onClick={handleSubmit(submitForm)}>Login</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Não possui uma conta? <a href='/signup'>Crie uma conta</a></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;