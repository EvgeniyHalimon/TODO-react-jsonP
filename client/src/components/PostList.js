import React from 'react';
import { Card, CloseButton, Container } from 'react-bootstrap';
import shortid from 'shortid';

export default function PostList({array}){
    return(
        <div className='cards'>
            {
                array.map(item => 
                    <Card 
                        body
                        className='list-item mb-3'
                        key={shortid.generate()} 
                    >
                        <p 
                            style={{wordBreak : 'break-word', marginRight : '5px', textAlign : 'left'}}
                        >{item.post}</p>
                        <CloseButton />
                    </Card>
                )
            }
        </div>
    )
}