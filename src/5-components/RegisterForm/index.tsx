import React from "react";
import { withFormik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { string as yup_string, object as yup_object } from "yup";

interface FormValues {
  username: string,
  email: string,
  password: string,
  passwordForConfirm: string,
}
const RegisterFormView = (props: FormikProps<FormValues>) => {
  const { isSubmitting } = props;

  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Field type="name" name="username" />
        <ErrorMessage name="username" component="div" />
      </div>
      <div>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
      </div>
      <div>
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
      </div>
      <div>
        <Field type="password" name="passwordForConfirm" />
        <ErrorMessage name="passwordForConfirm" component="div" />
      </div>
      <div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      </div>
    </Form>
  )
};
interface MyFormProps {
  submit: (values: any) => void;
}
export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      username: '',
      email: '',
      password: '',
      passwordForConfirm: '',
    }
  },
  handleSubmit: (values, formikBag) => {
    // const {password, passwordForConfirm} = values;
    // if (password!==passwordForConfirm) {

    // }
    const { passwordForConfirm, ...restValues } = values;
    formikBag.props.submit(restValues);
    // todo 400: A user with that email already exists

    // formikBag.resetForm({title: ''})

    // const res = formikBag.props.onAddGame(values.title)
    // if (res.success) {
    //   formikBag.resetForm({ title: '', isAfterReset: true })
    // } else {
    //   formikBag.setFieldError('title', res.msg)
    // }
  },
  // validate: values => {
  // todo: password!==passwordForConfirm
  // },
  validationSchema: yup_object().shape({
    username: yup_string().trim().required("Username is required."),
    email: yup_string().email().required("Email is required."),
    password: yup_string().required("Password is required."),
    passwordForConfirm: yup_string().required("Password is required."),
  }),
  // validateOnBlur: false,
  displayName: 'RegisterForm',
})(RegisterFormView);
