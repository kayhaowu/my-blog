'use client';
import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

const Pre = (props: any) => {
  const textInput = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput?.current?.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className='relative'>
      <pre ref={textInput} {...props} className='code-block'>
        {props.children}
      </pre>
      <button
        aria-label='Copy code'
        type='button'
        className='absolute right-2 top-2'
        onClick={onCopy}
      >
        {copied ? (
          <Check className='text-[#80d1a9]' />
        ) : (
          <Copy className='text-white' />
        )}
      </button>
    </div>
  );
};

export default Pre;