import classes from './chooseMonth.module.css'



export const ChooseMonth = ({thisMonth, valueDay, year}) => {

  return (
    <div className={classes.panel}>
      <div className={classes.month}>
        {thisMonth}
      </div>
      <div className={classes.currentDay}>
        {valueDay}
      </div>
      <div className={classes.year}>
        {year}
      </div>
    </div>
  )
};
