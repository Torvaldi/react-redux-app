import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  authText: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    marginBottom: '50px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  text: {
    lineHeight: '180%',
    color: 'grey',
  }
};

const Blocktext = (props) => {
  const { classes } = props;
  return (
    <article className={classes.authText}>
      <h1 className={classes.title}>Lorem ipsum dolor sit amet consectetur </h1>
      <span className={classes.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur reprehenderit velit explicabo </span>
    </article>
  );
}

export default withStyles(styles)(Blocktext)
