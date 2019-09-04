import React from 'react';
import classnames from "classnames";

export default function ({
                             name,
                             type,
                             error,
                             onChange,
                             placeholder,
                             value,
                             info,
                             disabled
                         }) {
    return (
        <div className="form-group">
            <input
                name={name}
                type={type}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            <div className='invalid-feedback'>{error}</div>
        </div>

    );
}