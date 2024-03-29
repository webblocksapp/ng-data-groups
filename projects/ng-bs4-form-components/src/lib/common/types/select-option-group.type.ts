import { SelectOption } from './select-option.type';

export type SelectOptionGroup = {
  group: string;
  groupValues: Array<SelectOption>;
  value?: number | string;
  viewValue?: number | string;
  disabled?: boolean;
};
