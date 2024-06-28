import { UserService } from "../Services/UserService";
import { UserModel } from "../Models/UserModel";
import { GeneralResponse } from "../Models/Response/GeneralResponse";
import Swal from "sweetalert2";
import NavbarComponent from "../Components/NavbarComponent";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export function Users() {
    const userService = new UserService();
    const [users, setUsers] = useState<UserModel[]>();
    const { isAuthenticated } = useAuth();

    const fetchData = async () => {
        await userService.GetAll().then((response: GeneralResponse<UserModel[]>) => {
            if (response.StatusCode == 200) {
                setUsers(response.Object);
            }
            else {
                if (response.StatusCode <= 500) {
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
        }).catch(() => {
            Swal.fire({
                title: 'Error',
                text: 'An error has occurred',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
        else {
            <Navigate to="/login"></Navigate>
        }
    }, []);

    return (
        <>
            <NavbarComponent />
            <div className="container">
                <h1>Users</h1 >
                <div className="table-responsive bg-light p-4 rounded">
                    <table className="table table-striped shadow">
                        <thead>
                            <tr className="text-center">
                                <th className="fw-bold">Name</th>
                                <th className="fw-bold">Last name</th>
                                <th className="fw-bold">Rol</th>
                                <th className="fw-bold">Email</th>
                                <th className="fw-bold">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user: UserModel) => {
                                return (
                                    <tr className="text-center" key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.email}</td>
                                        <td className="d-flex justify-content-evenly">
                                            <Link to={"/"}>
                                                <i className="bi bi-pencil-square text-success"></i>
                                            </Link>
                                            <Link to={"/"}>
                                                <i className="bi bi-trash3 text-danger"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}