import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [formValue, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...formValue,
            [target.name]: target.value
        });
    }

    const handleCheck = ({ target }) => {
        if (target.checked) {
          setValues({
            ...formValue,
            [target.name]: target.value,
          });
        }
      };
      const handleCheckBox = ({ target }) => {
        console.log(target.checked);
        setValues({
          ...formValue,
          [target.name]: target.checked,
        });
      };
    
      return [formValue, handleInputChange, reset];
    };
    
    