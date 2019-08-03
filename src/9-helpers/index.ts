export function sortBy(key: string, forward: boolean = true) {
  const direction = forward ? 1 : -1;
  return function compare(o1: any, o2: any) {
    if (o1[key] < o2[key]) {
      return -1 * direction;
    }
    if (o1[key] > o2[key]) {
      return 1 * direction;
    }
    return 0;
  };
}

export function getError(
  name: string,
  errors: { [name: string]: string | undefined },
  touched: { [name: string]: boolean | undefined }
) {
  return (errors[name] && touched[name] && errors[name]) || undefined;
}
