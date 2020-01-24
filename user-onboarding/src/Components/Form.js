import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function userForm ( { values, errors, touched }) {
// Form
    return (
        <div className="userForm">
            <Form>
                    <Field type="text" name="name" placeholder="Name " />
                    <div>
                        {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="text" name="email" placeholder="Email " />
                    </div>
                    <div>
                        {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password " />
                    </div>
                    <label>Do you accept our Terms of Service?
                    <div>
                    {touched.tos && errors.tos && <p>{errors.tos}</p>}
                    <Field type="checkbox" name="tos" placeholder="Accept Terms of Service?" checked={values.tos} />
                    </div>
                    </label>
                <button>
                    Submit!
                </button>

            </Form>
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
    handleSubmit(values){
        console.log(values);
    }
})(userForm);
export default FormikUserForm;
