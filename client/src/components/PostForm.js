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
        .required('Post is required'),
})

export default function PostForm(){
    const userId = Storage.getData('account')?.slice(1, -1)
    const dispatch = useDispatch()
    const postQuantity = useSelector(state => state.postQua)
    const pageQuantity = useSelector(state => state.pageQua)
    const name = useSelector(state => state.name)
    const POSTS = useSelector(state => state.array)
    const page = useSelector(state => state.activePage)

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

            getPosts()
            // dispatch(setData([data.data, ...POSTS]))
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
    }
    

    // console.log('************************************** page', page)
    //     console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ pageQuantity', pageQuantity)
    

    const handleDelete = async (e) => {
        await Fetch.delete(`posts/${e.target.id}`)
        
        // if(pageQuantity !== page){
        //     let test = pageQuantity - 1
        //     console.log(test)
        //     Fetch.get(`posts?userId=${userId}&_page=${test}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        //     .then(res => {
        //         console.log(res)
        //         dispatch(setData(res.data))
        //         dispatch(setActivePage(test))
        //     })
        // } else {
        //     dispatch(setActivePage(pageQuantity))
        // }
        getPosts()
        dispatch(setPostQuantity(Number(postQuantity) - 1))
        dispatch(setPageQuantity(Math.ceil(Number(postQuantity) / LIMIT)))
    }
    
    async function getPosts(){
        const ID = Storage.getData('account')?.slice(1, -1)
        Fetch.get(`posts?userId=${ID}&_page=${page ?? 1}&_limit=${LIMIT}&_sort=date,time&_order=desc,desc`)
        .then(res => {
            dispatch(setData(res.data))
            dispatch(setActivePage(page ?? 1))
        })
    }
    
    useEffect(() => {
        Fetch.get(`users/${userId}`).then(res => dispatch(setName(res.data.username)))
        getPosts()
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ pageQuantity !== page', pageQuantity === page)
        // if(pageQuantity === page){
        //     console.log('jeronimo')
        // }
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
