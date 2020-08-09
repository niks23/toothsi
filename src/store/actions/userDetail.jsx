import {
    NEW_GAME,    
} from './actionTypes'

export const newGame = (data) => {
    return {
        type: NEW_GAME,  
        payload: data,
    }
}


