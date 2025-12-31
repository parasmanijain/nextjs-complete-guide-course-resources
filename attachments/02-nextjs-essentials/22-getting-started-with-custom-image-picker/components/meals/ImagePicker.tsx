'use client';

import { useRef } from 'react';
import classes from './ImagePicker.module.scss';

interface ImagePickerProps {
  label?: string;
  name?: string;
}

export const ImagePicker = ({ label = '', name = '' }: ImagePickerProps) => {
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
        />
        <button
          className={classes.button}
          type='button'
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};
