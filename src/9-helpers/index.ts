export function sortBy(key: string, forward: boolean = true) {
  const direction = !forward ? -1 : 1 
  return function compare(o1: any, o2: any) {
    if (o1[key] < o2[key]) {
      return -1*direction;
    }
    if (o1[key] > o2[key]) {
      return 1*direction;
    }
    return 0;
  };
}
