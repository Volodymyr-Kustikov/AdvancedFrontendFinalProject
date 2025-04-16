import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import classes from './form.module.css';
import { Post } from '../App/businessLogic/types';

interface FormProps {
  valueDay: number;
  currentMonth: string;
  year: number;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

// 🧠 Zod-схема
const schema = z.object({
  title: z.string().min(1, 'Write'),
  note: z.string().min(1, 'Write!')
});

type FormInputs = z.infer<typeof schema>;

export const Form: React.FC<FormProps> = ({
  valueDay,
  currentMonth,
  year,
  posts,
  setPosts
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  });

  const handleSubmitting: SubmitHandler<FormInputs> = (data, event) => {
    event?.preventDefault();

    const newPost: Post = {
      title: data.title,
      note: data.note,
      date: `${valueDay}.${currentMonth}.${year}`
    };

    setPosts([...posts, newPost]);
  };

  return (
    <form className={classes.form}>
      <input
        className={classnames(classes.input, {
          [classes.inputError]: errors.title
        })}
        {...register('title')}
        type="text"
      />

      <input
        className={classnames(classes.input, {
          [classes.inputError]: errors.note
        })}
        {...register('note')}
        type="text"
      />

      {errors?.note && (
        <div className={classes.error}>{errors.note.message}</div>
      )}

      <button
        type="submit"
        className={classes.button}
        onClick={handleSubmit(handleSubmitting)}
      >
        try to click
      </button>
    </form>
  );
};
