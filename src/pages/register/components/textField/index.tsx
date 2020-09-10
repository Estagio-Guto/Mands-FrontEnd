import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {
    Eye as EyeIcon,
    EyeSlash as EyeSlashIcon,
} from '@styled-icons/fa-solid';

interface TextFieldProps {
    label: string;
    type?: string;
}

const TextFieldComponent: React.FC<TextFieldProps> = props => {
    const { label, type } = props;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            id="outlined-basic"
            required
            type={showPassword ? 'password' : 'text'}
            label={label}
            variant="outlined"
            style={{ width: '100%' }}
            InputProps={
                type === 'password'
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleShowPassword}
                                      onMouseDown={e => e.preventDefault()}
                                      style={{ width: 50 }}
                                  >
                                      {showPassword ? (
                                          <EyeIcon />
                                      ) : (
                                          <EyeSlashIcon />
                                      )}
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }
                    : {}
            }
            inputProps={{
                style: inputStyle,
            }}
        />
    );
};

const inputStyle = {
    paddingLeft: 5,
    fontFamily: 'Roboto',
};

export default TextFieldComponent;
