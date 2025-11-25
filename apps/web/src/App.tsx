import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TaskManager from "./components/TaskManager"
import "./App.css"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='app'>
                <TaskManager />
            </div>
        </QueryClientProvider>
    )
}

export default App
