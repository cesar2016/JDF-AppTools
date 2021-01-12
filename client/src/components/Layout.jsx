import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './modules/Navbar.jsx';
import Sidebar from './modules/Sidebar.jsx';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import { UIView } from '@uirouter/react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <CssBaseline />
        <Navbar></Navbar>
        <Hidden smDown>
          <Sidebar></Sidebar>
        </Hidden>
        <Container>
        <main className={classes.content}>
        <UIView />
        </main>
        </Container>
    </div>



  );
}
