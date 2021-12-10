/* const initialState = {
    posts : {
        activePage: 1,
        postQua : 0,
        pageQua : 0,
    }
} */

const updatePosts = (state, action) => {
    if(state === undefined){
        return {
            activePage: 1,
            postQua : 0,
            pageQua : 0,
        }
    }
    switch (action.type){
        case 'SET_ACTIVE_PAGE' :
            return{
                ...state.posts,
                activePage: action.payload
            }
        case 'SET_POST_QUANTITY':
            return {
                ...state.posts,
                postQua : action.payload
            }
        case 'SET_PAGE_QUANTITY':
            return {
                ...state.posts,
                pageQua : action.payload
            }
        default:
            return state.posts
    }
}


export default updatePosts