import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Button, TextField, FormControl, Box}  from '@mui/material';
import { Fetch } from '../utils/Fetch';
import PostList from './PostList';

const validationSchema = yup.object({
    post: yup
        .string('Enter your username')
        .min(1, 'Post is too short - should be 1 chars minimum.')
        .max(200, 'Must be 200 characters or less')
        .required('Post is required'),
})

export default function PostForm(){

    const [toggle, setToggle] = useState(false)
    const [posts, setPosts] = useState([])
    const [deletePost, setDeletePost] = useState(false)

    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log('POST BODY',values)
            Fetch.post('posts', {
                post : values.post,
                checked : false
            })
            setPosts([...posts, {post : values.post}])
            setToggle(!false)
            actions.resetForm()
        },
    })

    

    const handleDelete = (e) => {
        Fetch.delete(`posts/${e.target.id}`)
        setDeletePost(true)
    }
    
    useEffect(() => {
        async function getPosts(){
            const data = await Fetch.get('posts')
            console.log(data.data)
            setPosts(data.data)
            setToggle(!true)
            setDeletePost(false)
        }
        getPosts()
    }, [toggle, deletePost]);
    
    return(
        <Box
            className="form"
            onSubmit={formik.handleSubmit}
            component="form"
        >
            <h1>Post form</h1>
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
            <PostList array={posts} onClick={handleDelete}/>
        </Box>
    )
}
