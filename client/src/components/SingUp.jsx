import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const SignUpPage = () => {

    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const submitForm = (data) => {
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result.redirect_to) {
                window.location.href = result.redirect_to;
            } else {
                alert(result.message); 
            }
        })
        .catch(err => {
            console.error("Erro ao cadastrar:", err);
            alert("Erro ao cadastrar. Tente novamente.");
        });

        reset();
    };


    return (
        <div className="container ">
            <div className='form container-main'>
                <h1>Cadastra-se</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your username"
                            {...register("username", {required:true,maxLength:25})}
                        />
                        {errors.username?.type === "required" && <span style={{color: "red"}}><small>Username is required</small></span>}
                        {errors.username?.type === "maxLength" && <span style={{color: "red"}}><small>Max characters should be 25</small></span>}   
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Your email"
                            // can use a regex pattern
                            {...register("email", {required:true,maxLength:80})}
                        />
                        {errors.email?.type === "required" && <span style={{color: "red"}}><small>Email is required</small></span>}
                        {errors.email?.type === "maxLength" && <span style={{color: "red"}}><small>Max characters should be 80</small></span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password"
                            {...register("password", {required:true,minLength:8})}
                        />
                        {errors.password?.type === "required" && <span style={{color: "red"}}><small>Password is required</small></span>}
                        {errors.password?.type === "minLength" && <span style={{color: "red"}}><small>Min characters should be 8</small></span>}
                    </Form.Group>                 
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {required:true,minLength:8})}
                        />
                        {errors.confirmPassword?.type === "required" && <span style={{color: "red"}}><small>Need to confirm the password</small></span>}
                        {confirmPassword && confirmPassword !== password && (<span style={{ color: 'red' }}><small>The passwords do not match</small></span>)}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(submitForm)}>SignUp</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Já possui uma conta? <a href='/login'>Faça o login</a></small>
                    </Form.Group>

                </form>
            </div>
            
        </div>
    )
}

export default SignUpPage;