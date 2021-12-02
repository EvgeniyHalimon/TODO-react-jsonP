import React from 'react';
import { Card, CloseButton,  } from 'react-bootstrap';
import shortid from 'shortid';
import {CheckLg} from 'react-bootstrap-icons'


export default function PostList({array, onClick}){
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
                        <div>
                            <CheckLg id={item.id} color={'green'} size={30}/>
                            <CloseButton onClick={onClick} id={item.id}/>
                        </div>
                    </Card>
                )
            }
        </div>
    )
}