import React from 'react';
import spinner from './spinner.gif';

export default function () {
    return (
        <img style={{width: '200px', margin: 'auto', display: 'block'}}
            alt="Loading"
            src= {spinner}
        />
    );
}