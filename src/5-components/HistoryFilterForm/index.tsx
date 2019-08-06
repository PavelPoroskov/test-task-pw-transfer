import React from 'react';
import { withFormik, FormikProps, Form } from 'formik';
import { Row, Col, Button } from 'react-materialize';

import TextInput from '6-dsystem/TextInput';
import Autocomplete from '6-dsystem/Autocomplete';
import DatePicker from '6-dsystem/DatePicker';

interface FormValues {
  date: string | null;
  username: string | null;
  amount: number | null;
}
interface OtherProps {
  clearFilter: () => void;
  correspondentOnTyping: (filter: string) => void;
  correspondentList: { [key: string]: any };
}
const toString = (value: number | null) => {
  if (value == null) {
    return value;
  }
  return value === 0 ? '' : `${value}`;
};

const HistoryFilterFormView = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    handleChange,
    handleBlur,
    handleReset,
    clearFilter,
    values,
    correspondentList,
    correspondentOnTyping
  } = props;
  const options = { data: correspondentList };

  return (
    <Form>
      <Row>
        <Col l={12} m={12} s={12}>
          <DatePicker
            label="Date"
            // name="date"
            value={values['date']}
            onSelect={(date: Date) => {
              try {
                const y = date.getFullYear();
                const m = date.getMonth() + 1;
                const d = date.getDate();

                handleChange({
                  target: { name: 'date', value: `${y}-${m}-${d}` }
                });
              } catch (err) {}
            }}
            autoComplete="off"
          />
        </Col>
        <Col l={12} m={12} s={12}>
          <Autocomplete
            label="Correspondent"
            name="username"
            options={options}
            autoComplete="off"
            value={values['username']}
            onChange={(e: any, value: string) => {
              if (e) {
                correspondentOnTyping(value);
                handleChange(e);
              } else {
                handleChange({ target: { name: 'username', value } });
              }
            }}
            onBlur={handleBlur}
          />
        </Col>
        <Col l={12} m={12} s={12}>
          <TextInput
            type="number"
            min="0"
            label="Amount"
            name="amount"
            autoComplete="off"
            value={toString(values['amount'])}
            onChange={(e: any) =>
              handleChange({
                target: { name: 'amount', value: e.target.value || 0 }
              })
            }
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col className="right">
          <Button
            type="button"
            waves="light"
            onClick={() => {
              handleReset();
              clearFilter();
            }}
          >
            Clear Filter
          </Button>
          <Button type="submit" waves="light" className="form__submit">
            Set Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
interface MyFormProps extends FormValues {
  submit: (values: any) => void;
  clearFilter: () => void;
  correspondentOnTyping: (filter: string) => void;
  correspondentList: { [key: string]: any };
}
export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      date: props.date || '',
      username: props.username || '',
      amount: props.amount || 0
    };
  },
  handleSubmit: (values, formikBag) => {
    let amount = null;
    if (values.amount) {
      try {
        amount = parseInt(`${values.amount}`, 10);
      } catch (err) {}
    }
    formikBag.props.submit({
      date: values.date || null,
      username: values.username || null,
      amount
    });
  },
  enableReinitialize: true,
  displayName: 'HistoryFilterForm'
})(HistoryFilterFormView);
