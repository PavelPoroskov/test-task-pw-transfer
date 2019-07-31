import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { string as yup_string, number as yup_number, Schema } from "yup";

import { Row, Col, Button } from "react-materialize";
import TextInput from '6-dsystem/TextInput'
import Autocomplete from '6-dsystem/Autocomplete/index'


interface FormValues {
  name: string,
  amount: number,
}
interface OtherProps {
  cancel: () => void;
  onChangeFilter: (filter: string) => void, 
  recipients: {[key: string]: any}
}
const containerForm: React.CSSProperties = {
  display: 'flex', 
  flexDirection: 'column',
  border: 'solid',
  borderRadius: '1em',
  marginTop: '1em',
  marginBottom: '1em',
}
const stylesButton: React.CSSProperties = {
  marginLeft: '2em',
  marginRight: '0.75em',
}
const TransactioFormView = (props: OtherProps & FormikProps<FormValues>) => {
  const { isSubmitting, touched, errors, handleChange, handleBlur, cancel, values, recipients, onChangeFilter } = props;
  const bundle = { touched, errors, values, onChange: handleChange, onBlur: handleBlur }
  const options={ data: recipients };
  
  return (
    <Form style={containerForm}>
      <Row>
        <Col l={12} m={12} s={12}>
          <h4 className="center-align">New Transaction</h4>
        </Col>
      </Row>
      <Row>
        <Col l={12} m={12} s={12}>
          <Autocomplete label="Recipient" name="name" options={options} autoComplete="off" {...bundle} 
            onChange={(e: any, value: string)=>{
              if (e) {
                onChangeFilter(value);
                handleChange(e);
              } else {
                handleChange({target: {name:"name", value}});
              }
            }} 
          />
        </Col>
        <Col l={12} m={12} s={12}>
          <TextInput type="number" min="0" label="Amount" name="amount"  autoComplete="off" {...bundle} />
        </Col>
      </Row>
      <Row>
        <Col className="right">
          <Button type="button" waves="light" onClick={cancel}>
            Cancel
          </Button>
          <Button type="submit" waves="light" disabled={isSubmitting} style={stylesButton}>
            Commit
          </Button>
        </Col>
      </Row>
    </Form>
  )
};
interface MyFormProps extends FormValues {
  submit: (values: any) => void;
  cancel: () => void;
  balance: number;
  onChangeFilter: (filter: string) => void, 
  recipients: {[key: string]: any}
}
export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      name: props.name || '',
      amount: props.amount || 0,
    }
  },
  handleSubmit: (values, formikBag) => {
    formikBag.props.submit(values);
  },
  validate: (values,props) => {
    let errors: {[key: string]: string} = {};

    const testValue = (name: string, schema: Schema<any>, value: any, errors: {[key: string]: string}) => {
      try {
        schema.validateSync(value);
      }catch(err){
        errors[name] = err.errors[0];
      };
     };

    testValue('name', yup_string().trim().required("recipient's name is required."), values.name, errors );
    testValue('amount', yup_number().moreThan(0, "must be greater than zero").max(props.balance).required("amount is required."), values.amount, errors );

    return errors;
  },
  displayName: 'TransactioForm',
})(TransactioFormView);
