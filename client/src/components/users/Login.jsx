import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { login, logintrue, loginUserCookie, cargardb } from '../../actions/index';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Home from '../home/Home';
import { UIRouter, UIView, pushStateLocationPlugin} from '@uirouter/react';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Creado por SoFactory - Argentina -
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.impulsonegocios.com/wp-content/uploads/2019/06/empresa-metalurgica.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide({ login, date_user,logintrue, loginUserCookie,cargardb }) {
  const classes = useStyles();
  const history = useHistory();
  const [ userLog, setUserLog ] = useState({ username: "", password: "" })

  useEffect(() => {
    loginUserCookie()
  }, [])

  if(typeof date_user == "object"){
    history.push('/home')
  }

  const handleChange = function(e) {
    setUserLog({
    ...userLog,
    [e.target.name]: e.target.value
   });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(userLog);
  }

  const loadDB = function(){
    cargardb()
  }

  if ( date_user === false) {
    Swal.fire({
            icon: 'error',
            title: 'Oops... user or password invalid!',
            showConfirmButton: false,
            timer: 1500
          });
    logintrue()
  }
  function handleClick(event) {
    event.preventDefault();
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  if(typeof date_user === "object"){
    Swal.fire({
      icon: 'success',
      title: 'Bienvenid@!',
      showConfirmButton: false,
      timer: 1500
    })
    history.push('/home')
  }



  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <img src='https://i.postimg.cc/q7NTv10G/jdf.jpg' width="60px" height="50px" />        
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordame"
            />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                INICIAR SESION
              </Button>
          
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste tu clave?
                </Link>
              </Grid>
              
              <button onClick={loadDB}><small>cargadb</small></button>

            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    login: (userLog) => dispatch(login(userLog)),
    logintrue: () => dispatch(logintrue()),
    loginUserCookie: () => dispatch(loginUserCookie()),
    cargardb: () => dispatch(cargardb())
  }
}

const mapStateToProps = state => {
  return {
    date_user: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);