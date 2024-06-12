
import { useTeamsContext } from "../hooks/useTeamsContext"


const TeamDetails = ({ team }) => {
    const { dispatch } = useTeamsContext()

    const handleClick = async () => {
        const response = await fetch('/api/teams/' + team._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TEAM', payload: json})
        }
    }

    return (
        <div className="team-details">
            <h4>{team.teamName}</h4>
            <p><strong>Team Id:</strong>{team.teamId}</p>
            <p>{team.createdAt}</p>
            <span onClick = {handleClick}
            style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer', background: '#42b191' }}>
                Delete
            </span>
        </div>
    )
}

export default TeamDetails