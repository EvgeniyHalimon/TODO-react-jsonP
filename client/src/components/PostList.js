import React from 'react';
import { Card, CloseButton, Container } from 'react-bootstrap';
import shortid from 'shortid';

export default function PostList({array}){
    return(
        <div className='card-group'>
            {
                array.map(item => 
                    <Card 
                        className='list-item'
                        key={shortid.generate()} 
                    >
                        {item.post}
                        <div>
                            <CloseButton />
                        </div>
                    </Card>
                )
            }
        </div>
    )
}