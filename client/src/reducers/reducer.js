const initialState ={
    postQua : 0,
    pageQua : 0,
    userID : null,
    name :"Please register",
    array: [],
    //logout : false
}

const reducer = (state = initialState, action) => {
    /* console.log('~TYPE OF ACTION~', action.type) */
    switch (action.type){
    case 'SET_POST_QUANTITY':
        return {
            ...state,
            postQua : action.payload
        }
    case 'SET_PAGE_QUANTITY':
        return {
            ...state,
            pageQua : action.payload
        }
    case 'SET_USER_ID':
        return {
            ...state,
            userID : action.payload
        }
    case 'SET_NAME':
        return {
            ...state,
            name: action.payload
        }
    case 'SET_DATA':
        return {
            ...state,
            array: action.payload
        }
    case 'SET_LOGOUT': {
        return {
            postQua : 0,
            pageQua : 0,
            userID : null,
            name : "Please register",
            array: [],
            logout : action.payload
        }
    }
    default:
        return state
    }
}

export default reducer