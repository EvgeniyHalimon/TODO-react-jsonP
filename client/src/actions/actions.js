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


export{
    setPostQuantity,
    setPageQuantity
}