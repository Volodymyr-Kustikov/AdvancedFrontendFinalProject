import classes from './form.module.css';
import { useForm } from "react-hook-form";
import classnames from 'classnames'

export const Form = ({
  valueDay,
  currentMonth,
  year,
  posts,
  setPosts
}) => {

  const { register, handleSubmit, formState:{errors} } = useForm()

  const handleSubmitting = (data, event) => {
    event.preventDefault();

    const newPost = {
      title: data.title,
      note: data.note,
      date: `${valueDay}.${currentMonth}.${year}`,
    };

    setPosts([...posts, newPost]);
        console.log('bebra');

  }

  return (
    <form
      className={classes.form}
    >
      <input className={classnames(
        classes.input, {
        [classes.inputError] : errors.title
      })}
        {...register('title', {
          required: 'Write'
        })} 
        type='text'  
      />


      <input className={classnames(
        classes.input, {
        [classes.inputError] : errors.note
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
  )
}