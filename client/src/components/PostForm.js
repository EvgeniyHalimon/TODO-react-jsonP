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
import { setData, setName, setPageQuantity, setPostQuantity } from '../actions/actions';
import { LIMIT } from '../constants/constants';

const validationSchema = yup.object({
    post: yup
        .string('Enter your username')
        .min(1, 'Post is too short - should be 1 chars minimum.')
        .max(200, 'Must be 200 characters or less')
        .required('Post is required'),
})

export default function PostForm(){
    const userId = Storage.getData('account')
    const [addPost, setAddPost] = useState(false)
    const [deletePost, setDeletePost] = useState(false)
    const [checked, setChecked] = useState(false)
    const [page, setPage] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const dispatch = useDispatch()
    const postQuantity = useSelector(state => state.postQua)
    const pageQua = useSelector(state => state.pageQua)
    const name = useSelector(state => state.name)
    const POSTS = useSelector(state => state.array)
    

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
                time : new Date().toLocaleTimeString('it-IT'),
                userId: userId.slice(1, -1)
            })
            setAddPost(true)
            dispatch(setPostQuantity(Number(postQuantity) + 1))
            dispatch(setPageQuantity(Math.ceil(postQuantity / LIMIT)))
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
        dispatch(setPageQuantity(Math.ceil(Number(postQuantity) / LIMIT)))
    }

    const getPage = async (e) => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${e.target.id}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        dispatch(setData(data.data))
        setActivePage(Number(e.target.id))
        setPage(e.target.id)
    }

    const getFirstPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=1&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        setActivePage(Number(1))
        setPage(1)
        dispatch(setData(data.data))
    }

    const getPrevPage = async () => {
        if(Number(page) > 1){
            setPage(Number(page) - 1)
            const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            setActivePage(Number(page) - 1)
            dispatch(setData(data.data))
        }
    }

    const getNextPage = async () => {
        if(Number(page) < pageQua){
            setPage(Number(page) + 1)
            const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            setActivePage(Number(page) + 1)
            dispatch(setData(data.data))
        }
    }

    const getLastPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${pageQua}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        setActivePage(Number(pageQua))
        setPage(Number(pageQua))
        dispatch(setData(data.data))
    }

    useEffect(() => {
        const ID = Storage.getData('account')
        if(ID !== null){
            Fetch.get(`posts?userId=${ID.slice(1, -1)}&_page=${page}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            .then(res => {
                dispatch(setData(res.data))
                setAddPost(false)
                setDeletePost(false)
                setChecked(false)
            })
            Fetch.get(`users/${ID.slice(1, -1)}`)
            .then(res => dispatch(setName(res.data.username)))
            if(POSTS.length === 0){
                Fetch.get(`posts?userId=${ID.slice(1, -1)}&_page=${Number(activePage) - 1}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
                .then(res => {
                    dispatch(setData(res.data))
                    setAddPost(false)
                    setDeletePost(false)
                    setChecked(false)
                    setActivePage(Number(activePage) - 1)
                })
            } else {
                setActivePage(Number(page))
            }
        }
    }, [addPost, deletePost, checked, pageQua]);
    
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
