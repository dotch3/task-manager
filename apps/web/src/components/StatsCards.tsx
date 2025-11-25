import type { TaskStats } from "../types/task.types"

interface StatsCardsProps {
    stats: TaskStats
}

const StatsCards = ({ stats }: StatsCardsProps) => {
    return (
        <div className='stats' data-id='statsContainer'>
            <div className='stat-card total' data-id='totalCard'>
                <h3 data-id='totalTitle'>Total Tasks</h3>
                <p data-id='totalCount'>{stats.total}</p>
            </div>

            <div className='stat-card completed' data-id='completedCard'>
                <h3 data-id='completedTitle'>Completed</h3>
                <p data-id='completedCount'>{stats.completed}</p>
            </div>

            <div className='stat-card pending' data-id='pendingCard'>
                <h3 data-id='pendingTitle'>Pending</h3>
                <p data-id='pendingCount'>{stats.pending}</p>
            </div>
        </div>
    )
}

export default StatsCards
