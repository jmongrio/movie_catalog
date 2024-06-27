import { Button, Form } from "react-bootstrap";
import NavbarComponent from "../../Components/NavbarComponent";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import { LoginModel } from "../../Models/Access/LoginModel";
import { LoginService } from "../../Services/Access/LoginService";
import { GeneralResponse } from "../../Models/Response/GeneralResponse";
import React from "react";
import Swal from "sweetalert2";

export function Login() {
    const loginAuth = new LoginService();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        const login: LoginModel = {
            Email: String(data.email),
            Password: String(data.password)
        }

        console.log(login)

        const response = await loginAuth.Auth(login).then((response: GeneralResponse<LoginModel>) => {
            console.log(response)
            if(response.StatusCode == 200){
                Swal.fire({
                    title: 'Success',
                    text: response.Message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            else{
                if(response.StatusCode == 500){
                    Swal.fire({
                        title: 'Error',
                        text: response.Message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })                
                }
                else{
                    Swal.fire({
                        title: 'Warning',
                        text: response.Message,
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    })
                }
            }
            
            console.log("Paso")
        })

        // window.location.href = "/protected";
    }

    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to="/protected" />
    }

    return (
        <>
            <NavbarComponent />
            <div className="container fluid mt-5">
                <div className="col-md-5 mx-auto bg-light p-5 rounded-4">
                    <Form onSubmit={submitForm}>
                        <h1 className="text-center mb-3 text-muted">Welcome</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" name="rememberMe" />
                        </Form.Group>
                        <Button className="w-100" variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}