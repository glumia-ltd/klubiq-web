import { get } from "react-hook-form";

 // Parse formatted values back to numbers
 export const parseCurrency = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  };

  export const parsePercentage = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  };


  
  export const getLocaleFormat = (
    numberVal: number,
    style:  'percent' | 'unit' | 'decimal',
    decimals: number = 2,
  ) => {
    const locale = navigator.language;
    if (locale) {
      return new Intl.NumberFormat(locale, {
          style: `${style}`,
          minimumFractionDigits: style === 'percent' ? 0 : decimals,
          maximumFractionDigits: style === 'percent' ? 0 : decimals,
        }).format(style === 'percent' ? numberVal / 100 : numberVal);
    }
    return '';
  };