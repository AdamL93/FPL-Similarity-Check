import {TeamContext} from '../context/TeamContext'
import {useContext} from  'react'

export const useTeamsContext = () => {
    const context = useContext(TeamContext)

    if (!context) {
        throw Error('useTeamsContext must be used inside TeamsContextProvider')
    }

    return context
}