const TeamDetails = ({ team }) => {
    return (
        <div className="team-details">
            <h4>{team.teamName}</h4>
            <p><strong>Team Id:</strong>{team.teamId}</p>
            <p>{team.createdAt}</p>
        </div>
    )
}

export default TeamDetails