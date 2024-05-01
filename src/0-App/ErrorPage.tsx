import { useRouteError } from "react-router-dom";

const isObject = (v: unknown): v is object => typeof v === 'object' && v !== null

const errorMessage = (e: unknown) => {
  let message;

  switch (true) {
    case isObject(e) && 'statusText' in e: {
      message = e.statusText as string
      break
    }
    case isObject(e) && 'message' in e: {
      message = e.message as string
      break
    }
    case typeof e === 'string': {
      message = e
      break
    }
  }

  return message || null;
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage(error)}</i>
      </p>
    </div>
  );
}