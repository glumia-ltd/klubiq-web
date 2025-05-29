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

export interface GroupFormFieldV1 extends Omit<BaseFormFieldV1, 'type'> {
  type: 'group';
  groupFields: FormFieldV1[];
  layout?: 'row' | 'column';
  spacing?: number;
}

export interface ArrayFormFieldV1 extends Omit<BaseFormFieldV1, 'type'> {
  type: 'array';
  fields: FormFieldV1[];
  getArrayLength?: (values: any) => number;
  showIf?: (values: any) => boolean;
}

export type FormFieldV1 = BaseFormFieldV1 | GroupFormFieldV1 | ArrayFormFieldV1;

export interface BaseFormFieldV1 {
  name: string;
  label: string;
  type: Exclude<FieldTypeV1, 'group' | 'array'>;
  placeholder?: string;
  options?: SelectOptionV1[] | ((values: Record<string, any>) => SelectOptionV1[]);
  required?: boolean | ((values: Record<string, any>) => boolean);
  disabled?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  helperText?: string;
  isInFieldLabel?: boolean;
  defaultValue?: any;
  predefinedValue?: any;
  min?: number;
  max?: number;
  rows?: number;
  decimals?: number;
  formatType?: 'currency' | 'percent' | 'number' | 'decimal';
  currencyCode?: string;
  adornment?: {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
  };
  customComponent?: ReactNode | ((field: FormFieldApi, fieldConfig: FormFieldV1, form: any) => ReactNode);
  group?: string;
  isGroup?: boolean;
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
    tooltipMessages?: {
      favorite?: string;
      unfavorite?: string;
      delete?: string;
      sizeLimit?: string;
      upload?: string;
    };
  };
  addressConfig?: {
    label?: string;
    apiKey: string;
    country?: string;
    types?: string[];
    required?:boolean | ((values: Record<string, any>) => boolean);
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
