import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import classnames from 'classnames';
import classes from './form.module.css';
import { Post } from '../App/types';

interface FormProps {
  valueDay: number;
  currentMonth: string;
  year: number;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

interface FormInputs {
  title: string;
  note: string;
}

export const Form: React.FC<FormProps> = ({
  valueDay,
  currentMonth,
  year,
  posts,
  setPosts
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const handleSubmitting: SubmitHandler<FormInputs> = (data, event) => {
    if (event) {
      event.preventDefault();
    }

    const newPost: Post = {
      title: data.title,
      note: data.note,
      date: `${valueDay}.${currentMonth}.${year}`,
    };

    setPosts([...posts, newPost]);
  };

  return (
    <form className={classes.form}>
      <input 
        className={classnames(
          classes.input, {
          [classes.inputError]: errors.title
        })}
        {...register('title', {
          required: 'Write'
        })} 
        type='text'  
      />

      <input 
        className={classnames(
          classes.input, {
          [classes.inputError]: errors.note
        })}
        {...register('note', {
          required: 'Write!'
        })} 
        type='text'
      />

      {errors?.note && (
        <div className={classes.error}>
          {errors.note.message}
        </div>
      )}

      <button type='submit' className={classes.button} onClick={handleSubmit(handleSubmitting)}>
        try to click
      </button>
    </form>
  );
};
