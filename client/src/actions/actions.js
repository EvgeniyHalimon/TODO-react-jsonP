const setPostQuantity = (num) => {
    return{
        type:'SET_POST_QUANTITY',
        payload:num
    }
}

const setPageQuantity = (num) => {
    return{
        type : 'SET_PAGE_QUANTITY',
        payload: num
    }
}

const setUserId = (id) => {
    return{
        type: 'SET_USER_ID',
        payload: id
    }
}

const setName = (name) => {
    return {
        type: 'SET_NAME',
        payload: name
    }
}

const setData = (array) => {
    return {
        type: 'SET_DATA',
        payload: array
    }
}

const setLogout = (bool) => {
    return {
        type: 'SET_LOGOUT',
        payload: bool
    }
}

export{
    setPostQuantity,
    setPageQuantity,
    setUserId,
    setName,
    setData,
    setLogout
}