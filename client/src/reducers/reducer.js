const initialState ={
    pageQua : 0,
}

const reducer = (state = initialState, action) => {
    console.log('~TYPE OF ACTION~', action.type)
    switch (action.type){
    case 'SET_PAGE_QUANTITY':
        return {
            pageQua : action.payload
        }
    default:
        return state
    }
}

export default reducer