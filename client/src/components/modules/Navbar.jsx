import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar';
import { loginUserCookie, userLogout } from '../../actions/index';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:'#66CC66'
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


function Header({ loginUserCookie, users, userLogout }) {
  const history = useHistory();

  useEffect(() => {
    loginUserCookie()
  },[])
  
  if(users == 0){
    Swal.fire({
      icon: 'error',
      title: 'Error! Debes iniciar sesion para acceder!',
      showConfirmButton: true,
    });
    history.push('/')
  }


  
  const classes = useStyles();
  // menu user login
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // menu sidebar l
  const [anchorElSidebar, setAnchorElSidebar] = React.useState(null);
  const openSidebar = Boolean(anchorElSidebar);
  const handleMenuSidebar = (event) => {
    setAnchorElSidebar(event.currentTarget);
  };
  const handleCloseSidebar = () => {
    setAnchorElSidebar(null);
  };

  function handleLogOut() {
    userLogout()
    Swal.fire({
      title: '¿Está seguro/a que desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Ok!'
        )
        window.location.replace("http://localhost:3000");
      }
    })
      }


  const list = () => (
    <div
      className={classes.list}
      role="presentation"
    >
          <List>
            <ListItemLink href="/home">
              <ListItemIcon className={classes.topografy} ><HomeIcon/></ListItemIcon>
              <ListItemText primary='Inicio' />
            </ListItemLink>
          </List>
          <Divider/>
          <List>
            <ListItemLink href="/home/customers">
              <ListItemIcon><PeopleIcon/></ListItemIcon>
              <ListItemText primary='Clientes' />
            </ListItemLink>
          </List>
          <List>
            <ListItemLink href="/home/tools">
              <ListItemIcon><BuildIcon/></ListItemIcon>
              <ListItemText primary='Herramientas' />
            </ListItemLink>
          </List>
          <List>
            <ListItemLink href="/home/orders">
              <ListItemIcon><BuildIcon/></ListItemIcon>
              <ListItemText primary='Alquileres' />
            </ListItemLink>
          </List>
    </div>
)

  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Grid container spacing={3}>
          
          <Grid item xs={2} >
          <Hidden mdUp>
            <IconButton
              display={{ xs: 'block', md: 'none', lg: 'none' }}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuSidebar}
              edge="start"
              >
                <MenuIcon display={{ xs: 'block', md: 'none', lg: 'none' }} />
              </IconButton>
              
          </Hidden>
          </Grid>
            <Grid item xs={8}>
            <IconButton
                edge="end"
                aria-label="account of current user"
                //aria-controls={menuId}
                aria-haspopup="true"
                //onClick={handleProfileMenuOpen}
                color="inherit"
              > 
              <Avatar alt="Remy Sharp" src="https://i.postimg.cc/q7NTv10G/jdf.jpg" className={classes.large} />
              </IconButton>              
            </Grid>
            <Grid item align="right" xs={2}>
            <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              //aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >                     
              <Avatar className={classes.large} alt="Cindy Baker" src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" /> 
              &nbsp; <small style={{"color": "#000", "fontSize": "13px"}}>Welcome! <br/> 
              <b>ADMIN</b>
              </small>      
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  padding: 0,
                  transform: 'translateY(120%)',
                },
              }}
              MenuListProps={{
                style: {
                  padding: 0,
                }
              }}
            >
              <MenuItem
              autoFocus="true"
              onClick={handleLogOut}
              >
                Cerrar sesión
              </MenuItem>
            </Menu>
          </div>
          
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    );
}
  const mapDispatchToProps = dispatch => {
    return {
      loginUserCookie: () => dispatch(loginUserCookie()),
      userLogout: () => dispatch(userLogout())
    }
  }
  
  const mapStateToProps = state => {
    return {
      users: state.users
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);