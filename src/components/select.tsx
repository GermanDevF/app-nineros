"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { cn } from "@/lib/utils";

type Props<T> = {
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  onChange: (value?: string) => void;
  onCreateOption?: (inputValue: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export const Select = <T extends { label: string; value: string }>({
  options = [],
  value,
  onChange,
  onCreateOption,
  disabled,
  placeholder,
  className,
}: Props<T>) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value) ?? null;
  }, [options, value]);

  return (
    <CreatableSelect
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: "2.25rem", // h-9 equivalent
          borderRadius: "var(--radius-md)",
          borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
          borderWidth: "1px",
          backgroundColor: "var(--background)",
          boxShadow: state.isFocused
            ? "0 0 0 3px hsl(var(--ring) / 0.5)"
            : "none",
          transition: "color 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
          },
        }),
        input: (base) => ({
          ...base,
          color: "var(--foreground)",
          fontSize: "0.875rem", // text-sm
        }),
        placeholder: (base) => ({
          ...base,
          color: "var(--muted-foreground)",
          fontSize: "0.875rem", // text-sm
        }),
        singleValue: (base) => ({
          ...base,
          color: "var(--foreground)",
          fontSize: "0.875rem", // text-sm
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "var(--popover)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
          zIndex: 50,
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? "var(--accent)"
            : state.isSelected
            ? "var(--primary)"
            : "var(--background)",
          color: state.isFocused
            ? "var(--accent-foreground)"
            : state.isSelected
            ? "var(--primary-foreground)"
            : "var(--popover-foreground)",
          fontSize: "0.875rem", // text-sm
          padding: "0.5rem 0.75rem",
          cursor: "pointer",
          "&:active": {
            backgroundColor: "var(--accent)",
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "var(--accent)",
          borderRadius: "var(--radius-sm)",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "var(--accent-foreground)",
          fontSize: "0.75rem", // text-xs
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "var(--accent-foreground)",
          borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
          "&:hover": {
            backgroundColor: "var(--destructive)",
            color: "var(--destructive-foreground)",
          },
        }),
        clearIndicator: (base) => ({
          ...base,
          color: "var(--muted-foreground)",
          "&:hover": {
            color: "var(--foreground)",
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "var(--muted-foreground)",
          "&:hover": {
            color: "var(--foreground)",
          },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: "var(--border)",
        }),
      }}
      className={cn("text-sm", className)}
      options={options}
      value={formattedValue}
      onChange={onSelect}
      onCreateOption={onCreateOption}
      isDisabled={disabled}
      placeholder={placeholder}
      isClearable
      isSearchable
    />
  );
};
