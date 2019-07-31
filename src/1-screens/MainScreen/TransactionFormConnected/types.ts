export interface StateProps {
  readonly name: string,
  readonly amount: number,
  readonly balance: number,
}
export interface DispatchProps {
  submit: (input: any) => void,
  cancel: () => void,
}
export type Props = StateProps & DispatchProps;

