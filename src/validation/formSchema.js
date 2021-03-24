import * as yup from 'yup'



const formSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
    email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required'),
    password: yup
    .string()
    .required('Password is required'),
    terms: yup.boolean().oneOf([true],'please agree with our policy'),
})

export default formSchema