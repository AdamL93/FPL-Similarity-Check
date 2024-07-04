/*import { useEffect } from 'react'
import {useTeamsContext} from "../hooks/useTeamsContext"

//components
import TeamDetails from '../components/TeamDetails'
import TeamForm from '../components/TeamForm'

const Result = (props) => {
    console.log(props)
    const {teams, dispatch} = useTeamsContext()
    //fetches data - tutorial 9
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/api/teams') //this should be https://localhost4000/api/teams for actual development. See video 9 - 8mins
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_TEAMS', payload: json})
            }
        }

        fetchTeams()
    }, [])

    return (
        <div className="results">
            <div className ="teams">
                {teams && teams.map((team) =>(
                    <TeamDetails key={team._id} team={team} />
                ))}
            </div>
            <TeamForm />
        </div>
        
    )
}

export default Result

*/