import {AuthCredential, User} from './types'
import Api from "../../config/Api";

async function login(credential: AuthCredential): Promise<User> {
    const response = await Api.post<User>('api/user/login', credential)

    return response.data
}

async function logout(): Promise<unknown> {
    const response = await Api.delete('api/user/logout')

    return response.data
}

async function getCurrentUser() {
    const response = await Api.get<User>('api/user/')
    return response.data
}

export default {
    getCurrentUser,
    login,
    logout,
}