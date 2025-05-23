// src/components/DynamicForm/types.ts
import { ReactNode } from 'react';
import * as Yup from 'yup';

export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'datetime'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'decimal'
  | 'percent'
  | 'file'
  | 'hidden';

export interface SelectOption {
  label: string;
  value: string | number;
}

export type FormatType = 'percent' | 'unit' | 'decimal';

export interface InputAdornment {
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  validation?: Yup.AnySchema;
  helperText?: string;
  defaultValue?: any;
  predefinedValue?: any;
  min?: number;
  max?: number;
  rows?: number;
  customComponent?: ReactNode;
  adornment?: InputAdornment;
  formatType?: FormatType;
  formatFunction?: (value: any) => any; // Custom format function
  parseFunction?: (value: any) => any;  // Custom parse function for converting formatted value back
  decimals?: number; // For currency and percentage
  group?: string; // Reference to parent group
  isGroup?: boolean;
  groupFields?: FormField[];
  isInFieldLabel?: boolean;
  radioGroupDirection?: 'row' | 'column';
  minDate?: string;
  maxDate?: string;
  dependsOn?: DependsOn[];

}

export interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (values: any) => void;
  initialValues?: Record<string, any>;
  submitButtonText?: string;
  enableReset?: boolean;
  resetButtonText?: string;
  formatters?: {
    currency?: (value: number, decimals?: number) => string;
    percentage?: (value: number, decimals?: number) => string;
    [key: string]: ((value: any, ...args: any[]) => any) | undefined;
  };
  
}
 
export interface DependsOn {
  field: string;
  value: string;
}

export interface FormGroup {
  name: string;
  label?: string;
  fields: FormField[];
  columns?: 1 | 2 | 3 | 4; // For grid layout
}
