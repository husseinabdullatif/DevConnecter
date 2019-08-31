import React from 'react';
import classnames from "classnames";

export default function ({
                             name,
                             type,
                             error,
                             onChange,
                             placeholder,
                             value,
                             info
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
            />
            {info && <small className="form-text text-muted">{info}</small>}
            <div className='invalid-feedback'>{error}</div>
        </div>

    );
}