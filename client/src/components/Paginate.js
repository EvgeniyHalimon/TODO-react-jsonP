import React,{useState, useEffect} from 'react';
import shortid from 'shortid';
import { Pagination } from 'react-bootstrap';
import { Fetch } from '../utils/Fetch';
import { Storage } from '../utils/Storage';

const userId = Storage.getData('account')

export default function Paginate({getPage, getFirstPage, getPrevPage, getNextPage, getLastPage, activePage}){
    const [number, setNumber] = useState(1)
    let items = []
    const pageQua = Math.ceil(number / 5)

    useEffect(() => {
        async function getLimit(){
            const arrLegth = await Fetch.get(`posts?userId=${userId.slice(1, -1)}`)
            setNumber(arrLegth.data.length)
        }
        getLimit()
    },[number]);

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

    console.log('NUMBER STATE',number)

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