import React from 'react';
import { Container } from 'react-bootstrap';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Button, TextField, FormControl, Box}  from '@mui/material';

const validationSchema = yup.object({
    post: yup
        .string('Enter your username')
        .min(1, 'Post is too short - should be 1 chars minimum.')
        .max(200, 'Must be 200 characters or less')
        .required('Post is required'),
})

export default function PostForm(){
    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
        },
    })

    return(
        <Box
            className="form"
            onSubmit={formik.handleSubmit}
            component="form"
        >
        <h1>Post form</h1>
        <FormControl fullWidth>
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
    </Box>
    )
}
