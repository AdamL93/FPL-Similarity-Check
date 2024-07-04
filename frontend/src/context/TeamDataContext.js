/*

import { createContext } from 'react';

export const TeamDataContext = createContext()
export const teamReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TEAM':
            return {
                teamData: action.payload
            }
        default:
            return state
    }
}

//function to return child elements (children = anything that is wrapped by contexttprovider in index.js)
export const TeamDataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(teamReducer, {teamData: null})

    return (
        <TeamDataContext.Provider value={{...state, dispatch}} >
            { children }
        </TeamDataContext.Provider>
    )
}
    */