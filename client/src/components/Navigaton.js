import React from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation(){
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="success">
            <Container>
                <Navbar.Brand href="/">??????</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/dashboard">Dashboard</Link>
                    </Nav>
                    <Nav>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                        {/* <Link to="/">Logout</Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    )
}