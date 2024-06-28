import { GeneralResponse } from "../Models/Response/GeneralResponse";
import { UserModel } from "../Models/UserModel";

const apiUrl = import.meta.env.VITE_API_URL;

export class UserService{
    public async GetAll(): Promise<GeneralResponse<UserModel[]>> {
        return await fetch(`${apiUrl}/User`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((response: Response) => {
            return response.json();
        })
    }
}