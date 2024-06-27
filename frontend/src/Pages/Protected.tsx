import { useEffect } from "react";
import { UserService } from "../Services/UserService";
import { UserModel } from "../Models/UserModel";
import { GeneralResponse } from "../Models/Response/GeneralResponse";
import Swal from "sweetalert2";
import NavbarComponent from "../Components/NavbarComponent";

export function Protected() {
    const userService = new UserService();

    const fetchData = async () => {
        const response = await userService.GetAll().then((response: GeneralResponse<UserModel[]>) => {
            console.log(response)
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
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <NavbarComponent />
            <h1> Protected</h1 >
        </>
    )
}