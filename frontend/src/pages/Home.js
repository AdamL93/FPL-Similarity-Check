import { useEffect, useState } from 'react'

//components
import TeamDetails from '../components/TeamDetails'

const Home = () => {
    const [teams, setteams] = useState(null)
    //fetches data - tutorial 9
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/api/teams') //this should be https://localhost4000/api/teams for actual development. See video 9 - 8mins
            const json = await response.json()

            if(response.ok) {
                setteams(json)
            }
        }

        fetchTeams()
    }, [])

    return (
        <div className="home">
            <div className ="teams">
                {teams && teams.map((team) =>(
                    <TeamDetails key={team._id} team={team} />
                ))}
            </div>
        </div>
    )
}

export default Home