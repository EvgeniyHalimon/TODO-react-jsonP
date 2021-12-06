import React,{useState, useEffect} from 'react';
import shortid from 'shortid';
import { Pagination } from 'react-bootstrap';
import { Fetch } from '../utils/Fetch';
import { Storage } from '../utils/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { setPageQuantity, setPostQuantity } from '../actions/actions';

const userId = Storage.getData('account')

export default function Paginate({getPage, getFirstPage, getPrevPage, getNextPage, getLastPage, activePage}){
    const dispatch = useDispatch()
    const postQuantity = useSelector(state => state.postQua)
    const pageQuantity = useSelector(state => state.pageQua)

    let items = []

    if(userId !== null){
        async function getLimit(){
            const posts = await Fetch.get(`posts?userId=${userId.slice(1, -1)}`)
            dispatch(setPostQuantity(posts.data.length))
            dispatch(setPageQuantity(Math.ceil(postQuantity / 5)))
        }
        getLimit()
    }

    useEffect(() => {
    },[postQuantity, pageQuantity]);

    // console.log('PAGE QUANTITY PAGINATE COMP', pageQuantity)

    for (let num = 1; num <= pageQuantity; num++) {
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

    return(
        <div>
            {
                items.length === 0 ? 
                <h1>&#10031; No posts yet &#10031;</h1> :
                <Pagination style={{justifyContent : 'center'}}>
                    <Pagination.First onClick={getFirstPage} />
                    <Pagination.Prev onClick={getPrevPage} />
                        {items}
                    <Pagination.Next onClick={getNextPage} />
                    <Pagination.Last onClick={getLastPage} />
                </Pagination> 
            }
        </div>
        
    )
}