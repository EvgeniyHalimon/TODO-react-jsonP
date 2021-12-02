import React from 'react';
import { Card } from 'react-bootstrap';
import shortid from 'shortid';

export default function PostList({array, onClick, change}){
    return(
        <div className='cards'>
            {
                array.map(item => 
                    <Card 
                        body
                        className='list-item mb-3'
                        id={item.checked ? 'done' : 'undone'}
                        key={shortid.generate()} 
                    >
                        <p 
                            style={{wordBreak : 'break-word', marginRight : '5px', textAlign : 'left'}}
                        >{item.post}</p>
                        <div style={{display : 'flex'}}>
                            <p className='handlers' id={item.id}  onClick={change}>&#9989;</p>
                            <p className='handlers' onClick={onClick} id={item.id}>&#10060;</p>
                        </div>
                    </Card>
                )
            }
        </div>
    )
}