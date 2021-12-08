import React,{useEffect} from 'react';
import shortid from 'shortid';
import { Pagination } from 'react-bootstrap';
import { Fetch } from '../utils/Fetch';
import { Storage } from '../utils/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { setPageQuantity, setPostQuantity } from '../actions/actions';
import { LIMIT } from '../constants/constants';

export default function Paginate({getPage, getFirstPage, getPrevPage, getNextPage, getLastPage, page}){
    const dispatch = useDispatch()
    const postQuantity = useSelector(state => state.postQua)
    const pageQuantity = useSelector(state => state.pageQua)

    let items = []

    useEffect(() => {
        const userId = Storage.getData('account')?.slice(1, -1)
        async function getLimit(){
            const posts = await Fetch.get(`posts?userId=${userId}`)
            dispatch(setPostQuantity(posts.data.length))
        }
        getLimit()
    },[]);

    useEffect(() => {
        dispatch(setPageQuantity(Math.ceil(postQuantity / LIMIT)))
    }, [postQuantity]);

    for (let num = 1; num <= pageQuantity; num++) {
        items.push(
            <Pagination.Item 
                onClick={getPage}
                key={shortid.generate()}
                active={num === page}
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