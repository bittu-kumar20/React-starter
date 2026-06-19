import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  Controller,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import Checkbox from "./input/Checkbox";
import Input from "./input/InputField";
import Radio from "./input/Radio";
import TextArea from "./input/TextArea";
import Label from "./Label";
import MultiSelect from "./MultiSelect";

type Option = {
  label: string;
  value: string;
};

type FormFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  type:
    | "text"
    | "tel"
    | "number"
    | "email"
    | "date"
    | "time"
    | "password"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "multi-select"
    | "file"
    | "image"
    | "media";
  options?: Option[];
  disabled?: boolean;
  showError?: boolean;
  maxLength?: number;
  rows?: number;
  value?: string;
  accept?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const getFieldError = (
  errors: FieldErrors,
  name: string
): FieldError | undefined => {
  return name
    .split(".")
    .reduce<unknown>((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, errors) as FieldError | undefined;
};

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const FormFieldInternal = <TFormValues extends FieldValues>({
  name,
  label,
  required = false,
  type,
  placeholder,
  className,
  options = [],
  disabled = false,
  showError = !disabled,
  maxLength,
  rows,
  accept,
  inputMode,
  onInput,
  onKeyDown,
}: FormFieldProps<TFormValues>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const error = getFieldError(errors, name)?.message as string | undefined;
  const hasError = showError && Boolean(error);
  const isPassword = type === "password";

  return (
    <div data-form-field={name} className={cx("space-y-1.5", className)}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="ml-1 text-error-500">*</span>}
        </Label>
      )}

      {(
        [
          "text",
          "tel",
          "number",
          "email",
          "date",
          "time",
          "password",
        ] as const
      ).includes(type as never) && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Input
                id={name}
                name={name}
                type={isPassword && showPassword ? "text" : type}
                placeholder={placeholder}
                value={field.value ?? ""}
                onChange={(event) => {
                  let nextValue = event.target.value;

                  if (inputMode === "numeric" || type === "tel") {
                    nextValue = nextValue.replace(/\D/g, "");
                  }

                  if (typeof maxLength === "number") {
                    nextValue = nextValue.slice(0, maxLength);
                  }

                  field.onChange(nextValue);
                }}
                disabled={disabled}
                error={hasError}
                hint={error}
                maxLength={maxLength}
                inputMode={inputMode}
                onInput={onInput}
                onKeyDown={onKeyDown}
                className={isPassword ? "pr-11" : ""}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={disabled}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <IconEye className="size-5" />
                  ) : (
                    <IconEyeOff className="size-5" />
                  )}
                </button>
              )}
            </div>
          )}
        />
      )}

      {type === "textarea" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder={placeholder}
              rows={rows}
              value={field.value ?? ""}
              onChange={field.onChange}
              disabled={disabled}
              error={hasError}
              hint={error}
            />
          )}
        />
      )}

      {type === "select" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="relative">
              <select
                id={name}
                name={name}
                value={field.value ?? ""}
                onChange={(event) => field.onChange(event.target.value)}
                disabled={disabled}
                className={cx(
                  "h-11 w-full appearance-none rounded-lg border bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30",
                  disabled &&
                    "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500 opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
                  hasError &&
                    "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:focus:border-error-800",
                  !disabled &&
                    !hasError &&
                    "border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                )}
              >
                <option value="" disabled>
                  {placeholder ?? "Select option"}
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {showError && error && (
                <p className="mt-1.5 text-xs text-error-500">{error}</p>
              )}
            </div>
          )}
        />
      )}

      {type === "radio" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    label={option.label}
                    checked={field.value === option.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                ))}
              </div>
              {showError && error && (
                <p className="text-xs text-error-500">{error}</p>
              )}
            </div>
          )}
        />
      )}

      {type === "checkbox" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            if (options.length === 0) {
              return (
                <Checkbox
                  id={name}
                  checked={Boolean(field.value)}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              );
            }

            return (
              <div className="space-y-2">
                <div className="flex flex-col gap-3">
                  {options.map((option) => {
                    const selectedValues: string[] = Array.isArray(field.value)
                      ? field.value
                      : [];

                    return (
                      <Checkbox
                        key={option.value}
                        id={`${name}-${option.value}`}
                        label={option.label}
                        checked={selectedValues.includes(option.value)}
                        onChange={(checked) => {
                          const nextValue = checked
                            ? [...selectedValues, option.value]
                            : selectedValues.filter(
                                (value: string) => value !== option.value
                              );
                          field.onChange(nextValue);
                        }}
                        disabled={disabled}
                      />
                    );
                  })}
                </div>
                {showError && error && (
                  <p className="text-xs text-error-500">{error}</p>
                )}
              </div>
            );
          }}
        />
      )}

      {type === "multi-select" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div>
              <MultiSelect
                label=""
                options={options.map((option) => ({
                  value: option.value,
                  text: option.label,
                }))}
                value={Array.isArray(field.value) ? field.value : []}
                onChange={field.onChange}
                disabled={disabled}
                placeholder={placeholder}
              />
              {showError && error && (
                <p className="mt-1.5 text-xs text-error-500">{error}</p>
              )}
            </div>
          )}
        />
      )}

      {(type === "file" || type === "image" || type === "media") && (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value: _value, ...field } }) => (
            <div>
              <input
                {...field}
                id={name}
                name={name}
                type="file"
                accept={accept ?? (type === "image" ? "image/*" : undefined)}
                disabled={disabled}
                onChange={(event) => onChange(event.target.files?.[0] ?? null)}
                className={cx(
                  "focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3 file:pr-3.5 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400",
                  hasError && "border-error-500"
                )}
              />
              {showError && error && (
                <p className="mt-1.5 text-xs text-error-500">{error}</p>
              )}
            </div>
          )}
        />
      )}
    </div>
  );
};

export const FormField = React.memo(
  FormFieldInternal
) as typeof FormFieldInternal & {
  displayName?: string;
};

FormField.displayName = "FormField";
