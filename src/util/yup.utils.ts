// yupUtils.ts

import * as Yup from 'yup';

export function transformEmptyToNull(value: any, originalValue: any): any {
  if (originalValue === undefined || originalValue === null || originalValue.trim() === '') {
    return null;
  }
  if( value=="" ){
    console.log('valor vazil:::', value);
    
  }
  return value;
}

export const yupUtils = {
  transformEmptyToNull,
};