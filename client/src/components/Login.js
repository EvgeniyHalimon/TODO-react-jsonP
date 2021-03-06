import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Button, TextField, FormControl, Box}  from '@mui/material';
import { Fetch } from '../utils/Fetch';
import { Storage } from '../utils/Storage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName, setUserId } from '../actions/actions';
import { Alert } from 'react-bootstrap';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Enter the password.') 
})

export default function Login(){
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            Fetch.get(`users/?email=${values.email}`).then(res => {
                if((res.data[0].email === values.email) 
                    && (res.data[0].password === values.password)){
                    Storage.setData('account', res.data[0].id)
                    dispatch(setUserId(res.data[0].id))
                    dispatch(setName(res.data[0].username))
                    navigate('/dashboard')
                } 
                setIsLogin(false)
                setTimeout(() => {
                    setIsLogin(true)
                }, 2000);
            }).catch(err => {
                setEmail(false)
                setTimeout(() => {
                    setEmail(true)
                }, 2000);
            })
        },
    })

    useEffect(() => {
        return () => {
            setEmail(true)
            setIsLogin(true)
        }
    });

    return(
        <Box
            className="form"
            onSubmit={formik.handleSubmit}
            component="form"
        >
            <h1>login</h1>
            <FormControl fullWidth>
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
            {isLogin ? 
                <div></div> :
                <Alert className='mt-3' variant='danger'>Please, repeat password</Alert>
            }
            {email ? 
                <div></div> :
                <Alert className='mt-3' variant='danger'>Please, repeat email</Alert>
            }
        </Box>
    )
}

