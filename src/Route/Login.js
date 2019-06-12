import React from 'react';

import LoginForm from '../containers/form/LoginForm';
import BlockText from '../components/BlockText';

import { withStyles } from '@material-ui/styles';

const styles = {
  authBlock: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  authLayout: {
    height: '100%',
    display: 'flex',
  },
  imageLayout: {
    backgroundColor: 'lightblue',
    width: '65%',
  }
};

const Login = (props) => {
  const { classes } = props;
  return (
        <section className={classes.authLayout} >
          <article className={classes.authBlock}>
            <BlockText />
            <LoginForm />
          </article>
          <article className={classes.imageLayout}>
            Image
          </article>
        </section>
    );
}

export default withStyles(styles)(Login)
