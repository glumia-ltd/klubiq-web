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
  | 'array'
  | 'custom';

export interface SelectOptionV1 {
  label: string;
  value: string | number;
}

export interface GroupFormFieldV1 extends Omit<BaseFormFieldV1, 'type'> {
  type: 'group';
  groupFields: FormFieldV1[] | ((values: Record<string, any>) => FormFieldV1[]);
  layout?: 'row' | 'column';
  spacing?: number;
}

export interface ArrayFormFieldV1 extends Omit<BaseFormFieldV1, 'type'> {
  type: 'array';
  fields: FormFieldV1[] | ((values: Record<string, any>) => FormFieldV1[]);
  getArrayLength?: (values: any) => number;
  showIf?: (values: any) => boolean;
  useAccordion?: boolean;
  summaryFields?: { field: string; icon?: React.ReactNode; label?: string }[];
  arrayLengthSelectorField?: string;
  arrayLengthMax: number;
  arrayLengthMin: number;
  showAddButton?: boolean;
  addButtonText?: string;
  getDefaultItem?: (currentArray: any[]) => any;
  defaultItem?: Record<string, any>;
}

export interface CustomFormFieldV1 extends Omit<BaseFormFieldV1, 'type'> {
  type: 'custom';
  component: React.ReactNode | ((field: FormFieldApi, fieldConfig: FormFieldV1, form: any) => React.ReactNode);
  skipValidation?: boolean;
}

export type FormFieldV1 = BaseFormFieldV1 | GroupFormFieldV1 | ArrayFormFieldV1 | CustomFormFieldV1;
export interface StorageUploadResult {
  url: string;
  public_id?: string;
  original_filename?: string;
  secure_url?: string;
  format?: string;
  resource_type?: string;
  created_at?: string;
  bytes?: number;
  secure?: boolean;
  version?: number;
  signature?: string;
}
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
  fileConfig?: FileConfig;
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

export interface FileConfig {
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
    maxFavoritesReached?: string;
  };
  onUpload?: (files: File[]) => Promise<StorageUploadResult[]>;
  onDelete?: (publicId: string) => Promise<void>;
  uploadButtonText?: string;
  maxFavorites?: number;
  onUploadComplete?: (results: (StorageUploadResult & { isFavorite: boolean })[]) => void;
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

export interface DialogButton {
  text: string;
  onClick: (formData: any, result: any) => void;
  variant?: 'klubiqMainButton' | 'klubiqOutlinedButton' | 'klubiqTextButton';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  autoFocus?: boolean;
}

export interface NextActionDialog {
  title: string | ((result: any) => string);
  description: string | ((result: any) => string);
  buttons: DialogButton[];
  onClose?: (formData: any, result: any) => void;
  closeIcon?: React.ReactNode;
  renderContent?: (result: any) => React.ReactNode;
  showAfterSubmit?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export interface NextActionButton {
  text: string;
  onClick: (formData: any, result: any) => void;
  variant?: 'klubiqMainButton' | 'klubiqOutlinedButton' | 'klubiqTextButton';
  startIcon?: React.ReactNode;
  showAfterSubmit?: boolean;
}

export interface DynamicTanstackFormProps {
  fields: FormFieldV1[] | FormStep[];
  onSubmit: (values: any) => Promise<any>;
  initialValues?: Record<string, any>;
  submitButtonText?: string;
  enableReset?: boolean;
  resetButtonText?: string;
  isMultiStep?: boolean;
  onStepChange?: (step: number) => void;
  formWidth?: string;
  showTopBackButton?: boolean;
  showBackdrop?: boolean;
  backdropText?: string;
  nextAction?: NextActionButton | NextActionDialog;
  topBackButton?: {
    text: string;
    onClick: () => void;
    variant?: 'klubiqMainButton' | 'klubiqOutlinedButton' | 'klubiqTextButton';
    startIcon?: React.ReactNode;
    showDialog?: boolean;
    dialogTitle?: string;
    dialogDescription?: string;
    dialogConfirmButtonText?: string;
    dialogCancelButtonText?: string;
  };
  header?: React.ReactNode;
  subHeader?: React.ReactNode;
  underSubmitButtonNode?: React.ReactNode;
  horizontalAlignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  fullWidthButtons?: boolean;
  buttonLoadingText?: string;
  enableErrorAlert?: boolean;
  errorAlertTitle?: string;
  errorAlertMessage?: string;
}
// For internal use in KlubiqTSFormFields to allow the _isArraySubField flag
export type FormFieldV1WithArrayFlag = FormFieldV1 & { _isArraySubField?: boolean; _arrayFieldName?: string; _arrayIndex?: number };
