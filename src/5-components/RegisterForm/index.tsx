import { withFormik, FormikProps, Form } from 'formik';
import { string as yup_string, Schema } from 'yup';
import { Row, Col, Button } from 'react-materialize';

import TextInput from '6-dsystem/TextInput';
import { getError } from '9-helpers';

interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordForConfirm: string;
}
interface OtherProps {
  errorMessage: null | string;
}

const RegisterFormView = (props: FormikProps<FormValues> & OtherProps) => {
  const { touched, errors, handleChange, handleBlur, errorMessage } = props;
  const bundle = { onChange: handleChange, onBlur: handleBlur };

  return (
    <Form className="form">
      <Row>
        <Col l={12} m={12} s={12}>
          <h4 className="center-align">Register</h4>
        </Col>
      </Row>
      <Row>
        <Col l={12} m={12} s={12}>
          <TextInput
            label="Username"
            name="username"
            {...bundle}
            error={getError('username', errors, touched)}
          />
        </Col>
        <Col l={12} m={12} s={12}>
          <TextInput
            label="Email"
            email
            name="email"
            {...bundle}
            error={getError('email', errors, touched)}
          />
        </Col>
      </Row>
      <Row>
        <Col l={12} m={12} s={12}>
          <TextInput
            label="Password"
            password
            name="password"
            {...bundle}
            error={getError('password', errors, touched)}
          />
        </Col>
      </Row>
      <Row>
        <Col l={12} m={12} s={12}>
          <TextInput
            label="Confirm password"
            password
            name="passwordForConfirm"
            {...bundle}
            error={getError('passwordForConfirm', errors, touched)}
          />
        </Col>
      </Row>
      {errorMessage && (
        <Row>
          <Col l={12} m={12} s={12}>
            <div className="center-align form__error">{errorMessage}</div>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="right">
          <Button type="submit" waves="light" className="form__submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
interface MyFormProps {
  submit: (values: any) => void;
  errorMessage: null | string;
}
export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: _props => {
    return {
      username: '',
      email: '',
      password: '',
      passwordForConfirm: ''
    };
  },
  handleSubmit: (values, formikBag) => {
    const { passwordForConfirm, ...restValues } = values;
    formikBag.props.submit(restValues);
  },
  validate: values => {
    let errors: { [key: string]: string } = {};

    const testValue = (
      name: string,
      schema: Schema<any>,
      value: any,
      errors: { [key: string]: string }
    ) => {
      try {
        schema.validateSync(value);
      } catch (err) {
        if (typeof err === 'object' && err !== null && 'errors' in err && Array.isArray(err.errors) && err.errors[0]) {
          errors[name] = err.errors[0];
        }
      }
    };

    testValue(
      'username',
      yup_string()
        .trim()
        .required('username is required.'),
      values.username,
      errors
    );
    testValue(
      'email',
      yup_string()
        .email()
        .required('email is required.'),
      values.email,
      errors
    );
    testValue(
      'password',
      yup_string().required('password is required.'),
      values.password,
      errors
    );
    testValue(
      'passwordForConfirm',
      yup_string().required('confirm password is required.'),
      values.passwordForConfirm,
      errors
    );
    if (values.passwordForConfirm !== values.password) {
      errors['passwordForConfirm'] = 'must be equel to the password';
    }

    return errors;
  },
  displayName: 'RegisterForm'
})(RegisterFormView);
