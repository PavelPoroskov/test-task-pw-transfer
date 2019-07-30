import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { string as yup_string, object as yup_object } from "yup";

import { Row, Col, Button } from "react-materialize";
import TextInput from '6-dsystem/TextInput'

interface FormValues {
  email: string,
  password: string,
}
const RegisterFormView = (props: FormikProps<FormValues>) => {
  const { isSubmitting, touched, errors, values, handleChange, handleBlur } = props;
  const bundle = {touched, errors, values, onChange: handleChange, onBlur: handleBlur}
  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }}>
      <Row>
        <TextInput label="Email" email name="email" {...bundle} />
      </Row>
      <Row>
        <TextInput label="Password" password name="password" {...bundle} />
      </Row>
      <Row>
        <Col className="right">
          <Button type="submit" waves="light" disabled={isSubmitting}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
};
interface MyFormProps {
  submit: (values: any) => void;
}
export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: '',
      password: '',
    }
  },
  handleSubmit: (values, formikBag) => {

    formikBag.props.submit(values);
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
    email: yup_string().email().required("email is required."),
    password: yup_string().required("password is required."),
  }),
  // validateOnBlur: false,
  displayName: 'LoginForm',
})(RegisterFormView);
