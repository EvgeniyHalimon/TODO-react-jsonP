import React, {useEffect} from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Storage } from '../utils/Storage';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setLogout, setName, setPageQuantity, setPostQuantity, setUserId } from '../actions/actions';



export default function Navigation(){
    const account = Storage.getData('account')
    const user = useSelector(state => state.userID)
    const posts = useSelector(state => state.postQua)
    const dispatch =  useDispatch()
    dispatch(setUserId(account))

    console.log("================NAVI ACC================", account)
    console.log("===============NAVI ACC REDUX===============", user)

    const logout = () => {
        Storage.removeData('account')
        dispatch(setLogout(true))
    }

    useEffect(() => {
    }, [account, user, posts]);
    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="success">
            <Container>
                <Navbar.Brand href="/">Another usefull app</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/dashboard">Dashboard</Link>
                    </Nav>
                    <Nav>
                    { account || user  ? 
                        <Link 
                            to="/"
                            onClick={logout}
                        >Logout</Link> :
                        <div>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </div> 
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    )
}