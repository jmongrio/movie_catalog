import { Button, Form } from "react-bootstrap";
import { MovieModel } from "../../../Models/Movie/MovieModel";
import { ENTITY_STATUS } from "../../../Models/ENUM/ENTITY_STATUS";
import { UtilsService } from "../../../Services/UtilsService";
import React, { useEffect } from "react";
import { MovieService } from "../../../Services/MovieService";
import { useAuth } from "../../../Auth/AuthProvider";
import Swal from "sweetalert2";

export function CreateMovie() {
    const utilsService = new UtilsService()
    const movieService = new MovieService()
    
    const {isAuthenticated, setLoading} = useAuth();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        const fetchForm = async () => {
            utilsService.ToBase64(data.image as File).then((response: string) => {
                const imageBase64: string = response.replace("data:image/webp;base64,", "")
                console.log(imageBase64)
                const newMovie: MovieModel = {
                    Id: 0,
                    PrimaryImage: response,
                    Name: data.title.toString(),
                    Description: data.description.toString(),
                    Trailer: data.trailer.toString(),
                    Director: data.director.toString(),
                    Rating: 0,
                    Premiere: new Date(data.premiere.toString()),
                    Duration: data.duration.toString(),
                    CreatedAt: new Date(),
                    Status: ENTITY_STATUS.ACTIVE,
                }

                movieService.Add(newMovie).then((response) => {
                    if (response.StatusCode == 200) {
                        Swal.fire({
                            title: 'Success',
                            text: response.Message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                    else {
                        if (response.StatusCode == 500) {
                            Swal.fire({
                                title: 'Error',
                                text: response.Message,
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                        }
                        else {
                            Swal.fire({
                                title: 'Warning',
                                text: response.Message,
                                icon: 'warning',
                                confirmButtonText: 'Ok'
                            })
                        }
                    }
                })
            })
            setLoading(false)
        }

        fetchForm()
    }

    return (
        <div className="container fluid mt-5">
            <div className="col-md-5 mx-auto bg-light p-5 rounded-4">
                <Form onSubmit={submitForm}>
                    <h1 className="text-center mb-3 text-muted">Welcome</h1>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" placeholder="Enter email" name="image" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTrailer">
                        <Form.Label>Trailer</Form.Label>
                        <Form.Control type="url" placeholder="Enter email" name="trailer" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="director" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" placeholder="Enter email" name="rating" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPremiere">
                        <Form.Label>Premiere</Form.Label>
                        <Form.Control type="date" placeholder="Enter email" name="premiere" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="duration" />
                    </Form.Group>
                    <Button className="w-100" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}