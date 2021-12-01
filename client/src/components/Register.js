import React from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import shortid from 'shortid'
import { Button, TextField, FormControl, Box}  from '@mui/material';
import { Fetch } from '../utils/Fetch';

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .min(1, 'Username is too short - should be 8 chars minimum.')
        .max(20, 'Must be 20 characters or less')
        .required('Username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
})

export default function Register(){
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            Fetch.get(`users/?email=${values.email}`).then(res => {
                if(res.data.length === 0){
                    Fetch.post('users', {
                        username : values.username,
                        email : values.email,
                        password : values.password,
                        userId : shortid.generate()
                    })
                } 
            })
        },
    })
    return(
        <Box
            className="form"
            onSubmit={formik.handleSubmit}
            component="form"
        >
            <h1>register</h1>
            <FormControl fullWidth>
                <TextField
                    className='mb-3 form-element'
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    className='mb-3 form-element'
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    className='mb-3 form-element'
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </FormControl>
        </Box>
    )
}
