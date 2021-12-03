import React,{useState} from 'react';
import shortid from 'shortid';
import { Pagination } from 'react-bootstrap';



export default function Paginate({getPage, getFirstPage, getPrevPage, getNextPage, getLastPage}){
    const [active, setActive] = useState(1)
    const [items, setItems] = useState([])

    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item 
                onClick={getPage}
                key={shortid.generate()}
                active={number === active}
            >
                {number}
            </Pagination.Item>,
        );
    }

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