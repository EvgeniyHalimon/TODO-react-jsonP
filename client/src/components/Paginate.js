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
    const page = useSelector(state => state.activePage)
    const postQuantity = useSelector(state => state.postQua)
    const pageQuantity = useSelector(state => state.pageQua)

    let items = []

    const getPage = async (e) => {
        const data = await Fetch.get(`posts?userId=${userId}&_page=${e.target.id}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        dispatch(setActivePage(Number(e.target.id)))
        dispatch(setData(data.data))
    }

    const getFirstPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId}&_page=1&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        dispatch(setActivePage(1))
        dispatch(setData(data.data))
    }

    const getPrevPage = async () => {
        if(Number(page) > 1){
            const data = await Fetch.get(`posts?userId=${userId}&_page=${page - 1}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            dispatch(setActivePage(Number(page) - 1))
            dispatch(setData(data.data))
        }
    }

    const getNextPage = async () => {
        if(Number(page) < pageQuantity){
            const data = await Fetch.get(`posts?userId=${userId}&_page=${page + 1}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            dispatch(setActivePage(Number(page) + 1))
            dispatch(setData(data.data))
        }
    }

    const getLastPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId}&_page=${pageQuantity}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        dispatch(setActivePage(Number(pageQuantity)))
        dispatch(setData(data.data))
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