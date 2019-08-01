import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { string as yup_string, object as yup_object } from "yup";

import { Row, Col, Button } from "react-materialize";
import TextInput from '6-dsystem/TextInput'

interface OtherProps {
  errorMessage: null | string
}
interface FormValues {
  email: string,
  password: string,
}
const RegisterFormView = (props: FormikProps<FormValues> & OtherProps) => {
  const { touched, errors, handleChange, handleBlur, errorMessage } = props;
  const bundle = {touched, errors, onChange: handleChange, onBlur: handleBlur}
  return (
    <Form className="form">
      <Row>
        <Col l={12} m={12} s={12}>
          <h4 className="center-align">Login</h4>
        </Col>
      </Row>
      <Row>
      <Col l={12} m={12} s={12}>
        <TextInput label="Email" email name="email" autoComplete="off" {...bundle} />
        </Col>
      {/* </Row>
      <Row> */}
      <Col l={12} m={12} s={12}>
        <TextInput label="Password" password name="password" autoComplete="off" {...bundle} />
        </Col>
      </Row>
      {errorMessage && (
        <Row>
          <Col l={12} m={12} s={12}>
            <div className="center-align form-error">{errorMessage}</div>
          </Col>
        </Row>
        )}
      <Row>
        <Col className="right">
          <Button type="submit" waves="light" className="form-button">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
};
interface MyFormProps {
  submit: (values: any) => void;
  errorMessage: null | string;
}
export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: '',
      password: '',
    }
  },
  handleSubmit: (values, formikBag) => {
    formikBag.props.submit(values)
  },
  validationSchema: yup_object().shape({
    email: yup_string().email().required("email is required."),
    password: yup_string().required("password is required."),
  }),
  displayName: 'LoginForm',
})(RegisterFormView);
