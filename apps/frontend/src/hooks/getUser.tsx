import { useEffect, useState } from "react"
import { User } from "../pages/Dashboard"
import axios from "axios"

export const getUser = () => {
    const [user, setUser] = useState<User>()

    const fetchUser = async () => {
        const response = await axios.get(`${import.meta.env.VITE_HTTP_URl}/user`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })

        setUser(response.data.user)
    }

    useEffect(()=>{
        fetchUser()
    })


    return user
}