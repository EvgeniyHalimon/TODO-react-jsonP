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

const validationSchema = yup.object({
    post: yup
        .string('Enter your username')
        .min(1, 'Post is too short - should be 1 chars minimum.')
        .max(200, 'Must be 200 characters or less')
        .required('Post is required'),
})

const userId = Storage.getData('account')

export default function PostForm(){

    const [toggle, setToggle] = useState(false)
    const [posts, setPosts] = useState([])
    const [deletePost, setDeletePost] = useState(false)
    const [checked, setChecked] = useState(false)
    const [name, setName] = useState('Please register')
    const [page, setPage] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const pageQuantity = useSelector(state => state.pageQua)
    const dispatch = useDispatch()
    const pageQua = Math.ceil(pageQuantity / 5)

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
            setPosts([...posts, {post : values.post}])
            setToggle(true)
            setChecked(false)
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

    async function getUser(){
        if(userId !== null){
            const data = await Fetch.get(`users/${userId.slice(1, -1)}`)
            setName(data.data.username)
        }
    }

    const handleDelete = (e) => {
        Fetch.delete(`posts/${e.target.id}`)
        setDeletePost(true)
    }

    const getPage = async (e) => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${e.target.id}&_limit=5`)
        setPosts(data.data)
        setActivePage(Number(e.target.id))
        setPage(e.target.id)
    }
    const getFirstPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=1&_limit=5`)
        setActivePage(Number(1))
        setPosts(data.data)
    }

    const getPrevPage = async () => {
        if(Number(page) > 1){
            setPage(Number(page) - 1)
            const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=5`)
            setActivePage(Number(page) - 1)
            setPosts(data.data)
        }
    }

    const getNextPage = async () => {
        if(Number(page) < pageQua){
            setPage(Number(page) + 1)
            const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=5`)
            setActivePage(Number(page) + 1)
            setPosts(data.data)
        }
    }

    const getLastPage = async () => {
        const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${pageQua}&_limit=5`)
        setActivePage(Number(pageQua))
        setPosts(data.data)
    }
    
console.log('PAGE QUA', pageQua)
console.log('PAGE NUM', page)

    useEffect(() => {
        async function getPosts(){
            if(userId !== null){
                const data = await Fetch.get(`posts?userId=${userId.slice(1, -1)}&_page=${page}&_limit=5`)
                setPosts(data.data)
                setToggle(!true)
                setDeletePost(false)
                setChecked(false)
            }
        }
        getPosts()
        getUser()
    }, [toggle, deletePost, checked, name, page]);
    
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
            <PostList array={posts} onClick={handleDelete} change={handleChange}/>
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
