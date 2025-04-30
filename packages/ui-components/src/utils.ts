 // Parse formatted values back to numbers
 export const parseCurrency = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  };

  export const parsePercentage = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  };
