import React, { useEffect } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Button, TextField, FormControl, Box}  from '@mui/material';
import { Fetch } from '../utils/Fetch';
import PostList from './PostList';
import shortid from 'shortid';
import { Storage } from '../utils/Storage';
import Paginate from './Paginate';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePage, setData, setName, setPageQuantity, setPostQuantity } from '../actions/actions';
import { LIMIT } from '../constants/constants';

const validationSchema = yup.object({
    post: yup
        .string('Enter your username')
        .min(1, 'Post is too short - should be 1 chars minimum.')
        .max(200, 'Must be 200 characters or less')
        .required('Post is required')
})

export default function PostForm(){
    const userId = Storage.getData('account')?.slice(1, -1)
    const dispatch = useDispatch()
    const postQuantity = useSelector(state => state.posts.postQua)
    const page = useSelector(state => state.posts.activePage)
    const name = useSelector(state => state.user.name)
    const POSTS = useSelector(state => state.user.array)

    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            const data = await Fetch.post('posts', {
                post : values.post,
                checked : false,
                id : shortid.generate(), 
                date: new Date().toLocaleDateString('en-GB'),
                time : new Date().toLocaleTimeString('it-IT'),
                userId: userId
            })

            if(page === 1){
                dispatch(setData([data.data, ...POSTS.slice(0, 3)]))
            } else {
                getPosts()
            }
            
            dispatch(setPostQuantity(Number(postQuantity) + 1))
            dispatch(setPageQuantity(Math.ceil(postQuantity / LIMIT)))
            actions.resetForm()
        },
    })

    const handleChangePost = async (e) => {
        e.currentTarget.style.background = "green"
        await Fetch.patch(`posts/${e.target.id}`,{
            checked : true
        })
        getPosts()
        //slice, findIndex ?
    }
 
    const handleDelete = async (e) => {
        await Fetch.delete(`posts/${e.target.id}`)
        getPosts(POSTS.length === 1)
        dispatch(setPostQuantity(Number(postQuantity) - 1))
        dispatch(setPageQuantity(Math.ceil(Number(postQuantity) / LIMIT)))
    }
    
    async function getPosts(shouldGoToPreviousPage){
        const ID = Storage.getData('account')?.slice(1, -1)
        if(shouldGoToPreviousPage){
            const actualPage = page === 1 ? 1 : page - 1
            Fetch.get(`posts?userId=${ID}&_page=${actualPage}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            .then(res => {
                dispatch(setData(res.data))
                dispatch(setActivePage(actualPage))
            })
        } else{
            const actualPage = page ?? 1
            Fetch.get(`posts?userId=${ID}&_page=${actualPage}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
            .then(res => {
                dispatch(setData(res.data))
                dispatch(setActivePage(actualPage))
            })
        }
    }
    
    useEffect(() => {
        Fetch.get(`users/${userId}`).then(res => dispatch(setName(res.data.username)))
        getPosts()
    }, []);

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
            <PostList array={POSTS} onClick={handleDelete} change={handleChangePost}/> 
            <Paginate/>
        </Box>
    )
}
