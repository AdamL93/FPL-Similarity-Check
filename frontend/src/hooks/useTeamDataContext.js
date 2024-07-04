import { TeamDataContext } from '../context/TeamDataContext'
import { useContext } from  'react'


export const useTeamDataContext = () => {
    const context = useContext(TeamDataContext)

    if (!context) {
        throw Error('useTeamDataContext must be used inside TeamsContextProvider')
    }

    return context
}