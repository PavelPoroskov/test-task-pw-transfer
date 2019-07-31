export function sortBy(key: string) {
  return function compare(o1: any, o2: any) {
    if (o1[key] < o2[key]) {
      return -1;
    }
    if (o1[key] > o2[key]) {
      return 1;
    }
    return 0;
  };
}

export function sortReverseBy(key: string) {
  return function compare(o1: any, o2: any) {
    if (o1[key] < o2[key]) {
      return 1;
    }
    if (o1[key] > o2[key]) {
      return -1;
    }
    return 0;
  };
}
