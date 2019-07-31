import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { string as yup_string, Schema } from "yup";

import { Row, Col, Button } from "react-materialize";
import TextInput from '6-dsystem/TextInput'

interface FormValues {
  username: string,
  email: string,
  password: string,
  passwordForConfirm: string,
}

const RegisterFormView = (props: FormikProps<FormValues>) => {
  const { isSubmitting, touched, errors, handleChange, handleBlur } = props;
  const bundle = {touched, errors, onChange: handleChange, onBlur: handleBlur}

  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }}>
      <Row>
        <Col l={12} m={12} s={12}>
          <h4 className="center-align">Register</h4>
        </Col>
      </Row>
      <Row>
        <TextInput label="Username" name="username" {...bundle} />
      </Row>
      <Row>
        <TextInput label="Email" email name="email" {...bundle} />
      </Row>
      <Row>
        <TextInput label="Password" password name="password" {...bundle} />
      </Row>
      <Row>
        <TextInput label="Confirm password" password name="passwordForConfirm" {...bundle} />
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
      username: '',
      email: '',
      password: '',
      passwordForConfirm: '',
    }
  },
  handleSubmit: (values, formikBag) => {
    const { passwordForConfirm, ...restValues } = values;
    formikBag.props.submit(restValues);
  },
  validate: values => {
    let errors: {[key: string]: string} = {};

    const testValue = (name: string, schema: Schema<any>, value: any, errors: {[key: string]: string}) => {
      try {
        schema.validateSync(value);
      }catch(err){
        errors[name] = err.errors[0];
      };
     };

    testValue('username', yup_string().trim().required("username is required."), values.username, errors );
    testValue('email', yup_string().email().required("email is required."), values.email, errors );
    testValue('password', yup_string().required("password is required."), values.password, errors );
    testValue('passwordForConfirm', yup_string().required("confirm password is required."), values.passwordForConfirm, errors );
    if (values.passwordForConfirm!==values.password) {
      errors['passwordForConfirm'] = 'must be equel to the password'
    }

    return errors;
  },
  displayName: 'RegisterForm',
})(RegisterFormView);