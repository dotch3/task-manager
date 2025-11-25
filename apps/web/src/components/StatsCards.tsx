import type { TaskStats } from "../types/task.types"

interface StatsCardsProps {
    stats: TaskStats
}

const StatsCards = ({ stats }: StatsCardsProps) => {
    return (
        <div className='stats'>
            <div className='stat-card total'>
                <h3>Total Tasks</h3>
                <p>{stats.total}</p>
            </div>
            <div className='stat-card completed'>
                <h3>Completed</h3>
                <p>{stats.completed}</p>
            </div>
            <div className='stat-card pending'>
                <h3>Pending</h3>
                <p>{stats.pending}</p>
            </div>
        </div>
    )
}

export default StatsCards
