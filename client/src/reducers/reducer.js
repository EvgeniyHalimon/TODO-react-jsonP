const initialState ={
    postQua : 0,
    pageQua : 1
}

const reducer = (state = initialState, action) => {
    console.log('~TYPE OF ACTION~', action.type)
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
    default:
        return state
    }
}

export default reducer