const initialState = {
    userData: {}
}
 
const reducer = (state = initialState, action) => {
    console.log(action.payload);
    
    if(action.type == 'new-game') {        
        return {
            ...state,
            userData: action.payload
        }
    }

    return state;    
}
 
export default reducer;
