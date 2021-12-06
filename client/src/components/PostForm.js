import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Button, TextField, FormControl, Box}  from '@mui/material';
import { Fetch } from '../utils/Fetch';
import PostList from './PostList';
import shortid from 'shortid';
import { Storage } from '../utils/Storage';
import Paginate from './Paginate';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setName, setPageQuantity, setPostQuantity, setUserId } from '../actions/actions';

const validationSchema = yup.object({
    post: yup
        .string('Enter your username')
        .min(1, 'Post is too short - should be 1 chars minimum.')
        .max(200, 'Must be 200 characters or less')
        .required('Post is required'),
})


const limit = 5

export default function PostForm(){
    const userId = Storage.getData('account')
    const [toggle, setToggle] = useState(false)
    //const [posts, setPosts] = useState([])
    const [deletePost, setDeletePost] = useState(false)
    const [checked, setChecked] = useState(false)
    const [page, setPage] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const dispatch = useDispatch()
    const postQuantity = useSelector(state => state.postQua)
    const pageQua = useSelector(state => state.pageQua)
    const name = useSelector(state => state.name)
    const POSTS = useSelector(state => state.array)
    console.log('==========================================POSTS==========================================',POSTS)

    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            Fetch.post('posts', {
                post : values.post,
                checked : false,
                id : shortid.generate(), 
                date: new Date().toLocaleDateString('en-GB'),
                userId: userId.slice(1, -1)
            })
            //setPosts([...posts, {post : values.post}])
            dispatch(setData([...POSTS, {post : values.post}]))
            setToggle(true)
            setChecked(false)
            dispatch(setPostQuantity(Number(postQuantity) + 1))
            dispatch(setPageQuantity(Math.ceil(postQuantity / 5)))
            actions.resetForm()
        },
    })

    const handleChange = async (e) => {
        e.currentTarget.style.background = "green"
        await Fetch.patch(`posts/${e.target.id}`,{
            checked : true
        })
        setChecked(true)
    }

    const handleDelete = (e) => {
        Fetch.delete(`posts/${e.target.id}`)
        setDeletePost(true)
        dispatch(setPostQuantity(Number(postQuantity) - 1))
        dispatch(setPageQuantity(Math.ceil(postQuantity / 5)))
        if(pageQua === Number(page)){
            setActivePage(activePage - 1)
            /* getActivePage() */
            if (Number(page) === 1){
                setActivePage(1)
            }
        } 
    }

    /* async function getActivePage(){
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${activePage - 1}&_limit=${limit}`)
        dispatch(setData(data.data))
    } */

    const getPage = async (e) => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${e.target.id}&_limit=${limit}`)
        dispatch(setData(data.data))
        setActivePage(Number(e.target.id))
        setPage(e.target.id)
    }

    const getFirstPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=1&_limit=${limit}`)
        setActivePage(Number(1))
        setPage(1)
        dispatch(setData(data.data))
    }

    const getPrevPage = async () => {
        if(Number(page) > 1){
            setPage(Number(page) - 1)
            const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=${limit}`)
            setActivePage(Number(page) - 1)
            dispatch(setData(data.data))
        }
    }

    const getNextPage = async () => {
        if(Number(page) < pageQua){
            setPage(Number(page) + 1)
            const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=${limit}`)
            setActivePage(Number(page) + 1)
            dispatch(setData(data.data))
        }
    }

    const getLastPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${pageQua}&_limit=${limit}`)
        setActivePage(Number(pageQua))
        setPage(Number(pageQua))
        dispatch(setData(data.data))
    }

    async function getPosts(){
        const _userId = Storage.getData('account');

        if(_userId !== null){
            const data = await Fetch.get(`posts?userId=${_userId.slice(1, -1)}&_page=${page}&_limit=${limit}`)
            const name = await Fetch.get(`users/${_userId.slice(1, -1)}`)
            dispatch(setName(name.data.username))
            dispatch(setData(data.data))
            setToggle(false)
            setDeletePost(false)
            setChecked(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [toggle, deletePost, checked, name, page, postQuantity, pageQua, activePage]);
    
    return(
        <Box
            className="form"
            onSubmit={formik.handleSubmit}
            component="form"
        >
            <h1>Welcome back, {name}</h1>
            <FormControl 
            fullWidth
            className='mb-3'
            >
                <TextField
                    id="outlined-multiline-static"
                    label="What's going on?"
                    multiline
                    rows={4}
                    className='mb-3 form-element'
                    id="post"
                    name="post"
                    value={formik.values.post}
                    onChange={formik.handleChange}
                    error={formik.touched.post && Boolean(formik.errors.post)}
                    helperText={formik.touched.post && formik.errors.post}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </FormControl>
            <PostList array={POSTS} onClick={handleDelete} change={handleChange}/>
            <Paginate
                getPage={getPage}
                getFirstPage={getFirstPage}
                getPrevPage={getPrevPage}
                getNextPage={getNextPage}
                getLastPage={getLastPage}
                activePage={activePage}
            />
        </Box>
    )
}
