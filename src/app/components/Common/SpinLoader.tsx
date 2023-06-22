import React from 'react';

type InputLoaderProps = { cls?: string };

export default function SpinLoader({ cls }: InputLoaderProps) {
    return (
        <div className={`sk-chase ${cls}`}>
            <div className='sk-chase-dot' />
            <div className='sk-chase-dot' />

            <div className='sk-chase-dot' />
            <div className='sk-chase-dot' />
            <div className='sk-chase-dot' />
        </div>
    );
}

SpinLoader.defaultProps = {
    cls: '',
};
