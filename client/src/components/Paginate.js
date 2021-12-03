import React,{useState, useEffect} from 'react';
import shortid from 'shortid';
import { Pagination } from 'react-bootstrap';
import { Fetch } from '../utils/Fetch';
import { Storage } from '../utils/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { setPageQuantity } from '../actions/actions';

const userId = Storage.getData('account')

export default function Paginate({getPage, getFirstPage, getPrevPage, getNextPage, getLastPage, activePage}){
    const dispatch = useDispatch()
    const pageQuantity = useSelector(state => state.pageQua)
    let items = []
    const pageQua = Math.ceil(pageQuantity / 5)
    useEffect(() => {
        async function getLimit(){
            const posts = await Fetch.get(`posts?userId=${userId.slice(1, -1)}`)
            dispatch(setPageQuantity(posts.data.length))
        }
        getLimit()
    },[pageQuantity]);

    for (let num = 1; num <= pageQua; num++) {
        items.push(
            <Pagination.Item 
                onClick={getPage}
                key={shortid.generate()}
                active={num === activePage}
                id={num}
            >
                {num}
            </Pagination.Item>,
        );
    }

    console.log('NUMBER STATE', pageQuantity)

    return(
        <Pagination style={{justifyContent : 'center'}}>
            <Pagination.First onClick={getFirstPage} />
            <Pagination.Prev onClick={getPrevPage} />
                {items}
            <Pagination.Next onClick={getNextPage} />
            <Pagination.Last onClick={getLastPage} />
        </Pagination>
    )
}