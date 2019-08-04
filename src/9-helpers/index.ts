export function getError(
  name: string,
  errors: { [name: string]: string | undefined },
  touched: { [name: string]: boolean | undefined }
) {
  return (errors[name] && touched[name] && errors[name]) || undefined;
}
