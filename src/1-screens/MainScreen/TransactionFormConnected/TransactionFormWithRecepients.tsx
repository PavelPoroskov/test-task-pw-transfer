import React, {useState, useEffect} from "react";
import { useDebouncedCallback } from 'use-debounce';
import client from "8-remote/client"
import TransactionForm from '5-components/TransactionForm';
import {Props} from './types';

const TransactionFormWithRecepients: React.FC<Props> = (props) => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState({});
  // const [error, setError] = useState(null);

  const [debouncedOnChange] = useDebouncedCallback( (value) => {
    setFilter(value)
  }, 700 );

  useEffect(() => {
    if (!filter) {
      return;
    }

    const abortController = new AbortController();

    client.getRecipients(filter, {signal: abortController.signal} )
      .then(arr => {
        setData(arr.reduce((acc: {[key: string]: any},item)=>{
          acc[item.name] = null;
          return acc;
        },{}))
      })
      .catch(({ message, name }) => {
        // name !== "AbortError" && setError(message)
      });

    return () => abortController.abort();
  }, [filter]);

  return <TransactionForm onChangeFilter={debouncedOnChange} recepients={data} {...props}/>
}

export default TransactionFormWithRecepients;
