import api from "./api"

const authorization = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token) {
        return {auth: false}
    }
    api.defaults.headers.Authorization = token
    const auth = await api.post("http://localhost:3001/authorization", {token: token})
    
    return {auth: auth.data.auth, user: auth.data.user }
}

export default authorization