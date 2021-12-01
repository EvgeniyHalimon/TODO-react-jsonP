import React from 'react';
import { Container } from 'react-bootstrap';
import PostForm from './PostForm';
import PostList from './PostList';

export default function Dashboard(){
    return(
        <Container>
            <h1>dashboard</h1>
            <PostForm/>
            <PostList/>
        </Container>
        
    )
}
