/**
 * Task Management API
 *
 * @author Dotch3 <dothc3@gmail.com>
 * @description RESTful API for managing tasks - Created for testing purposes
 * @version 1.0.0
 * @license MIT
 */

import express, { Application, Request, Response } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
import path from "path"
import { initializeDatabase } from "./database/db"
import { TaskService } from "./services/task.service"
import routes from "./routes"
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware"
import { serverConfig } from "./config/database.config"

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Swagger Documentation
try {
    const swaggerPath = path.join(__dirname, "../docs/swagger.yaml")
    console.log("Loading Swagger from:", swaggerPath)
    const swaggerDocument = YAML.load(swaggerPath)

    // Update Swagger document with dynamic server URL
    const PORT = serverConfig.port
    const HOST = serverConfig.host
    swaggerDocument.servers = [
        {
            url: `http://${HOST}:${PORT}`,
            description: `${serverConfig.env === "production" ? "Production" : "Development"} server`,
        },
    ]

    app.use("/api-docs", swaggerUi.serve as any)
    app.get("/api-docs", swaggerUi.setup(swaggerDocument) as any)
    console.log("✅ Swagger loaded successfully")
} catch (error) {
    console.warn("⚠️  Swagger documentation not available:", error)
}

// Health check
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        message: "Task Management API is running",
        author: "Your Name",
        purpose: "Testing and educational purposes",
        port: serverConfig.port,
        environment: serverConfig.env,
    })
})

// API Routes
console.log("Loading API routes...")
app.use("/api", routes)
console.log("✅ API routes loaded")

// Error handlers - MUST come after all routes
app.use(notFoundHandler)
app.use(errorHandler)

// Initialize database and start server
const startServer = () => {
    try {
        console.log("🔧 Initializing database...")
        initializeDatabase()
        console.log("✅ Database initialized successfully")

        console.log("🌱 Seeding initial data...")
        TaskService.seedInitialData()
        console.log("✅ Database seeded successfully")

        const PORT = serverConfig.port
        const HOST = serverConfig.host

        app.listen(PORT, () => {
            console.log("\n🚀 Server is running!")
            console.log(`📍 API: http://${HOST}:${PORT}/api`)
            console.log(`📚 Swagger Docs: http://${HOST}:${PORT}/api-docs`)
            console.log(`❤️  Health Check: http://${HOST}:${PORT}/health`)
            console.log(`⚙️  Environment: ${serverConfig.env}`)
            console.log(`🔌 Port: ${PORT}`)
            console.log("\n📋 Available endpoints:")
            console.log(`   GET    http://${HOST}:${PORT}/api/tasks`)
            console.log(`   GET    http://${HOST}:${PORT}/api/tasks/:id`)
            console.log(`   POST   http://${HOST}:${PORT}/api/tasks`)
            console.log(`   PUT    http://${HOST}:${PORT}/api/tasks/:id`)
            console.log(`   PATCH  http://${HOST}:${PORT}/api/tasks/:id/complete`)
            console.log(`   DELETE http://${HOST}:${PORT}/api/tasks/:id`)
            console.log(`\n🔧 Admin endpoints:`)
            console.log(`   POST   http://${HOST}:${PORT}/api/tasks/reset`)
            console.log(`\n👤 Author: Your Name (your.email@example.com)`)
            console.log(`⚠️  Note: Created for testing purposes\n`)
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error)
        process.exit(1)
    }
}

console.log("Starting application...")
startServer()

export default app
