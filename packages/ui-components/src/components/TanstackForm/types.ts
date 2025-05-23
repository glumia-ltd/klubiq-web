// types.ts
import { z } from 'zod';
import { ReactNode } from 'react';
import { FieldApi } from '@tanstack/react-form';

// types.ts

export type FormFieldApi = FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
export type FieldTypeV1 = 
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
  | 'hidden'
  | 'range'
  | 'autocomplete'
  | 'checkbox-group'
  | 'address'
  | 'group'
  | 'array';

export interface SelectOptionV1 {
  label: string;
  value: string | number;
}


export interface FormFieldV1 {
  name: string;
  label: string;
  type: FieldTypeV1;
  placeholder?: string;
  options?: SelectOptionV1[] | ((values: Record<string, any>) => SelectOptionV1[]);
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  helperText?: string;
  isInFieldLabel?: boolean;
  defaultValue?: any;
  min?: number;
  max?: number;
  rows?: number;
  customComponent?: ReactNode | ((field: FormFieldApi) => ReactNode);
  group?: string;
  isGroup?: boolean;
  groupFields?: FormFieldV1[];
  dependsOn?: {
    field: string;
    value: any;
    operator?: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  }[];
  width?: string | number;
  showIf?: (values: Record<string, any>) => boolean;
  step?: number;
  fileConfig?: {
    accept?: string;
    maxSize?: number;
    multiple?: boolean;
    subtitle?: string;
    caption?: string;
  };
  addressConfig?: {
    apiKey: string;
    country?: string;
    types?: string[];
  };
  validation?: {
    schema: z.ZodType<any>;
    dependencies?: {
      field: string;
      type: 'min' | 'max' | 'equals' | 'notEquals';
      message?: string;
    }[];
  };
  radioGroupDirection?: 'row' | 'column';
  checkboxGroupDirection?: 'row' | 'column';
}


export interface StepIcon {
    icon: ReactNode;
    activeIcon?: ReactNode;
    completedIcon?: ReactNode;
    errorIcon?: ReactNode;
  }
  
  export interface FormStep {
    title: string;
    description?: string;
    fields: FormFieldV1[];
    icon?: StepIcon;
  }

export interface DynamicTanstackFormProps {
  fields: FormFieldV1[] | FormStep[];
  onSubmit: (values: any) => Promise<any>;
  initialValues?: Record<string, any>;
  submitButtonText?: string;
  enableReset?: boolean;
  resetButtonText?: string;
  isMultiStep?: boolean;
  onStepChange?: (currentStep: number) => void;
  formWidth?: string | number;
}

export interface ArrayFormFieldV1 extends FormFieldV1 {
    type: 'array';
    fields: FormFieldV1[];
    getArrayLength?: (values: any) => number;
    showIf?: (values: any) => boolean;
  }
