import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
 
import { cargardb } from '../../actions/index';
import { connect } from 'react-redux';


const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function ClippedDrawer({cargardb}) {
  const classes = useStyles();

  const loadDB = function(){
    cargardb()

  }

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
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
              <ListItemIcon><BusinessCenter/></ListItemIcon>
              <ListItemText primary='Alquileres' />
            </ListItemLink>
          </List>
          <List>
            <ListItemLink>
              <button onClick={loadDB}><small>cargadb</small></button>
            </ListItemLink>
          </List>
          
        </div>
      </Drawer>

  );
}
const mapDispatchToProps = dispatch => {
  return {
    cargardb: () => dispatch(cargardb()),
  }
}

const mapStateToProps = state => {
  return {
    all_tools: state.all_tools,
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClippedDrawer);