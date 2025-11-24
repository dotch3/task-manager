import path from "path"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

export const databaseConfig = {
    filename: path.join(__dirname, "../../tasks.db"),
    seedData: [
        {
            name: "to make a good coffee",
            is_done: false,
        },
        {
            name: "to send the invite for my b-day's party to the guys",
            is_done: false,
        },
        {
            name: "To pay the credit card invoice",
            is_done: true,
        },
    ],
}

export const serverConfig = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    host: process.env.HOST || "localhost",
}
