export interface DropdownProps<T> {
  options: { label: string; value: T }[];
  selected: T[];
  onSelect: (values: T[]) => void;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
}
