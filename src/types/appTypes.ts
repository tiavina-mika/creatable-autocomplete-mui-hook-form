export interface ISelectOption {
  readonly value: any;
  readonly label: string;
}

export interface ICreatableSelectOption extends Partial<ISelectOption> {
  inputValue?: any;
  disabled?: boolean;
}
