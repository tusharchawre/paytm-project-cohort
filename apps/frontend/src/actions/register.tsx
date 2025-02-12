import axios from "axios"
import { useEffect } from "react"

interface registerProps {
    username: string
    password: string
    email: string
}

export const registerAction = ({username, password, email}: registerProps ) => {

    const register = async () => {
        const response = await axios.post(`${import.meta.env.VITE_HTTP_URl}/user/signin` , {
            username,
            email,
            password
        })

        return response.status
    }

    useEffect(()=>{
        register()
    })
}