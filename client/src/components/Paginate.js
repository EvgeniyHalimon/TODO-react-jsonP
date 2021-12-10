import React,{useEffect} from 'react';
import shortid from 'shortid';
import { Pagination } from 'react-bootstrap';
import { Fetch } from '../utils/Fetch';
import { Storage } from '../utils/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, setData, setPageQuantity, setPostQuantity } from '../actions/actions';
import { LIMIT } from '../constants/constants';

export default function Paginate(){
    const userId = Storage.getData('account')?.slice(1, -1)
    const dispatch = useDispatch()
    const page = useSelector(state => state.posts.activePage)
    const postQuantity = useSelector(state => state.posts.postQua)
    const pageQuantity = useSelector(state => state.posts.pageQua)

    const getPageUniversal = async (newPage) => {
        const data = await Fetch.get(`posts?userId=${userId}&_page=${newPage}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        dispatch(setActivePage(newPage))
        dispatch(setData(data.data))
    }
    
    const getPage = async (e) => {
        getPageUniversal(Number(e.target.id))
    }

    const getFirstPage = async () => {
        getPageUniversal(1)
    }

    const getPrevPage = async () => {
        if(Number(page) > 1){
            getPageUniversal(Number(page) - 1)
        }
    }
    
    const getNextPage = async () => {
        if(Number(page) < pageQuantity){
            getPageUniversal(Number(page) + 1)
        }
    }
    
    const getLastPage = async () => {
        getPageUniversal(pageQuantity)
    }
    
    useEffect(() => {
        async function getLimit(){
            const posts = await Fetch.get(`posts?userId=${userId}`)
            dispatch(setPostQuantity(posts.data.length))
        }
        getLimit()
    },[]);
    
    useEffect(() => {
        dispatch(setPageQuantity(Math.ceil(postQuantity / LIMIT)))
    }, [postQuantity]);
    
    let items = []
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