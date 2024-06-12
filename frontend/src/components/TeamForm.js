import { useState } from "react"
import {useTeamsContext} from "../hooks/useTeamsContext"

const TeamForm = () => {
    const { dispatch } = useTeamsContext()
    const [teamName, setTeamName] = useState(null)
    const [teamId, setTeamId] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const completeSubmit = async (e) => {
        e.preventDefault()

        const team = {teamName, teamId}

        const response = await fetch('/api/teams', {
            method:'POST',
            body: JSON.stringify(team),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTeamId(null)
            setTeamName(null)
            setError(null)
            setEmptyFields([])
            console.log('New Team Added!')
            dispatch({type: 'CREATE_TEAM', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={completeSubmit}>
            <h3>Add a Team</h3>

            <label>Team Id</label>
            <input
                type="text"
                onChange={(e) => setTeamId(e.target.value)}
                value={teamId}
                className={emptyFields.includes('teamId') ? 'error': ''}

            />
            <label>Team Name</label>
            <input
                type="text"
                onChange={(e) => setTeamName(e.target.value)}
                value={teamName}
                className={emptyFields.includes('teamName') ? 'error': ''}

            />
            <button>Add Team</button>
            {error && <div className ="error">{error}</div>}
        </form>
    )
}

export default TeamForm