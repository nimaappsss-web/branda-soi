"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@/components/others/ErrorMessage";

interface InputFormFieldProps {
  registration?: Partial<UseFormRegisterReturn>;
  hasError?: FieldError;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isRequired?: boolean;
  showPasswordToggle?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const InputFormField = ({
  registration,
  hasError,
  label,
  placeholder,
  type = "text",
  className,
  isRequired,
  showPasswordToggle,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}: InputFormFieldProps) => {
  const fieldProps = registration || {};
  const fieldName = name || (fieldProps.name as string | undefined);

  return (
    <div className={clsx("w-full", className)}>
      {!!label && (
        <Label htmlFor={fieldName} className="mb-2 block">
          {label}
          {isRequired && <span className="text-primary"> *</span>}
        </Label>
      )}
      <Input
        id={fieldName}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!hasError}
        className={clsx(hasError && "border-red-500")}
        {...(showPasswordToggle ? { showPasswordToggle } : {})}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={fieldName}
        {...fieldProps}
      />
      {hasError?.message && <ErrorMessage>{hasError.message}</ErrorMessage>}
    </div>
  );
};
