/* const initialState ={
    posts : {
        activePage: 1,
        postQua : 0,
        pageQua : 0,
    },
    user:{
        userID : null,
        name : "Please register",
        array: [],
        logout : false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
    case 'SET_ACTIVE_PAGE' :
        return{
            ...state,
            posts: {
                ...state.posts,
                activePage: action.payload
            }
        }
    case 'SET_POST_QUANTITY':
        return {
            ...state,
            posts: {
                ...state.posts,
                postQua : action.payload
            }
        }
    case 'SET_PAGE_QUANTITY':
        return {
            ...state,
            posts: {
                ...state.posts,
                pageQua : action.payload
            }
        }
    case 'SET_USER_ID':
        return {
            ...state,
            user: {
                ...state.user,
                userID : action.payload
            }
        }
    case 'SET_NAME':
        return {
            ...state,
            user: {
                ...state.user,
                name: action.payload
            }
        }
    case 'SET_DATA':
        return {
            ...state,
            user: {
                ...state.user,
                array: action.payload
            }
        }
    case 'SET_LOGOUT': {
        return {
            posts : {
                activePage: 1,
                postQua : 0,
                pageQua : 0,
            },
            user:{
                userID : null,
                name : "Please register",
                array: [],
                logout : false
            }
        }
    }
    default:
        return state
    }
} */

import updatePosts from "./post-reducer"
import updateUser from "./user-reducer"

const reducer = (state, action) => {
    return{
        user: updateUser(state, action),
        posts: updatePosts(state, action),
    }
}

export default reducer