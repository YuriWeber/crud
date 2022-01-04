import api from "./api"

export default function StoreToken(token) {
    api.defaults.headers.Authorization = token
    return localStorage.setItem("user", JSON.stringify(token))
}