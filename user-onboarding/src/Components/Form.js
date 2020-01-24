import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// const NewUser = (props) => {
//     const [user, setUser] = useState([]);
//     useEffect(() => {
//         status && setUser(user => [...user, status])
//     }, [status])
// }
// const Users = useState([]);
//     useEffect(() => {
//     status && setUsers(users => [...users, status])
//     }, [status]);

const UserForm = ({ status, values, errors, touched }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

// Form
    return (
        <div className="userForm">
            <i class="far fa-heart"></i>
            <Form>
                    <Field type="text" name="name" placeholder="Name " value={values.name} />
                    <div>
                        {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="text" name="email" placeholder="Email " values={values.email} />
                    </div>
                    <div>
                        {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password " value={values.password} />
                    </div>
                    <label className="tos">Do you accept our Terms of Service?
                    <div>
                        {touched.tos && errors.tos && <p>{errors.tos}</p>}
                    <Field type="checkbox" name="tos" placeholder="Accept Terms of Service?" checked={values.tos} value={values.tos} />
                    </div>
                    </label>
                <button type='submit'>
                    Submit!
                </button>
            </Form>

            {users.map(users => (
                <div className='auContainer'>
                <div className="active-users">Active Users</div>
                <ul>
                    <li>{users.name}</li>
                    <li>{users.email}</li>
                </ul>
                </div>
            ))}

        </div>
    )
    };



const FormikUserForm = withFormik({

//Mapping props to Values
    mapPropsToValues({name, email, password, tos}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        };
    },


//Validation Schema
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(1, 'Please enter your name.')
        .required('Please enter your name.'),

        email: Yup.string()
        .email('Email is not valid.')
        .required('Please enter your email address.'),

        password: Yup.string()
        .min(7, 'Password must be at least 7 characters in length.')
        .required('Please enter a valid password.'),

        tos: Yup.bool()
        .required('Please check this box to agree to our Terms of Service.')
    }),

//Handle Submit
    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }){
        if (values.email === 'amhwaa@gmail.com'){
            setErrors({ email: "Nice try, kid." })
        } else {
            axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res.data);
                resetForm();
                setSubmitting(false);
                setStatus(res.data);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            });
        }
        console.log(values);
    }
})(UserForm);
export default FormikUserForm;
