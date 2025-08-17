import { useState } from "react";

export interface DropdownOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  options: DropdownOption<T>[];
  selected: T[];
  onSelect: (values: T[]) => void;
  required?: boolean;
  hasError?: boolean;
  placeholder?: string;
}

function Dropdown<T extends string | number>({
  options,
  selected,
  onSelect,
  required = false,
  hasError = false,
  placeholder = "Select...",
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: T) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onSelect(newSelected);
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    return options
      .filter((opt) => selected.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ");
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-toggle ${hasError ? "error" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {getDisplayText()}
        {required && <span className="required-asterisk">*</span>}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value.toString()}
              className="checkbox-option"
              onClick={() => toggleOption(option.value)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                readOnly
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}

      {hasError && (
        <div className="error-message">Molimo odaberite bar jednu opciju</div>
      )}
    </div>
  );
}

export default Dropdown;
