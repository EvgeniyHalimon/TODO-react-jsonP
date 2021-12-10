/* const initialState = {
    user : {
        userID : null,
        name : "Please register",
        array: [],
        logout : false
    }
} */

const updateUser = (state, action) => {
    if(state === undefined){
        return  {
            userID : null,
            name : "Please register",
            array: [],
            logout : false
        }
    }
    switch (action.type){
        case 'SET_USER_ID':
            return {
                ...state.user,
                userID : action.payload
            }
        case 'SET_NAME':
            return {
                ...state.user,
                name: action.payload
            }
        case 'SET_DATA':
            return {
                ...state.user,
                array: action.payload
            }
        case 'SET_LOGOUT': {
            return {
                userID : null,
                name : "Please register",
                array: [],
                logout : action.payload
            }
        }
        default:
            return state.user
    }
}


export default updateUser