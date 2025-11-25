import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

const ApiStatus = () => {
    const { data, isError } = useQuery({
        queryKey: ["api-health"],
        queryFn: async () => {
            const response = await axios.get(`${API_URL.replace("/api", "")}/health`)
            return response.data
        },
        refetchInterval: 10000, // Check every 10 seconds
        retry: 1,
    })

    const isConnected = !isError && data

    return (
        <div className='connection-status'>
            <div className={`status-dot ${isConnected ? "connected" : "disconnected"}`}></div>
            <span>{isConnected ? `API Connected (Port: ${data?.port})` : "API Disconnected"}</span>
        </div>
    )
}

export default ApiStatus
