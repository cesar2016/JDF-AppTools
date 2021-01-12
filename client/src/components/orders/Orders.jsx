import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'; 
import Swal from 'sweetalert2/src/sweetalert2.js'
 
// tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
// tables
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'moment/locale/es';
// buttons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import moment from "moment";
import 'moment/locale/es';
//Buscador
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'; 
import Badge from '@material-ui/core/Badge';

import { getAllTools, insertTools, allOrder, updateOrder, deleteTools, getClient, clientOrder, toolsOrder, deleteOrder } from '../../actions/index';
 
//Modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useHistory } from 'react-router-dom';


moment.locale('es') 

const useStyles = makeStyles((theme)=>({ 
  table: {
    minWidth: 650,
  },
  tableFalse: {
    color: "#ccc",
  },
  marginBreadcumb:{
    marginBottom:10,
  },
  button:{
    marginBottom:12,
  },
  root: {
    '& > *': {
      margin: theme.spacing(2),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary, 
    },
    
  },
}))
 
function Orders({ getAllTools, all_tools, allOrder, all_order, deleteOrder, all_client, getClient, updateOrder}) {
    useEffect(() => {
    getAllTools();     
    allOrder();
    getClient();
    },[])
  const history = useHistory();
  const [order, setOrder] = React.useState({});
  const [open, setOpen] = React.useState(false);


    //ESTADOS DEL BUSCADOR CLIENTE
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  //OPCIONES DEL BUSCADOR CLIENTE
  var options = [];
  var options = all_order.map((ele) => {
    return (
      ele.client.name + " " + ele.client.lastname
    )
    
  })

var orderBuscada;
if(value){
  orderBuscada = all_order.filter((el) => el.client.name + " " + el.client.lastname == value)  
}
  //ESTADOS DEL BUSCADOR TOOLS
  const [valueTools, setValueTools] = React.useState();
  const [inputValueTools, setInputValueTools] = React.useState('');


  //OPCIONES DEL BUSCADOR TOOLS
  var optionsTools = all_order.map((eleTools) => {
    return (
      eleTools.tool
    )
  })
  if(valueTools){
    orderBuscada = all_order.filter((ele) => ele.tool == valueTools )
  }


  const classes = useStyles();
    
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

const refresh = ()=> {
  if(value != null || value != undefined){
    allOrder()
  }
}

const refreshTools = ()=> {
  if(valueTools != null || valueTools != undefined){
    allOrder()
  }
}

const handleClose = () => {
  setOrder({})
  setOpen(false)
};

const handleChange = function(e) {
  const {name, value } = e.target
    setOrder({
    ...order,
    [name]: value,
  });
}

const handleOpen = (item) => {
  setOrder(item)
  setOpen(true)
};

const handleDelete = function(id){
  Swal.fire({
    title: 'Quieres borrar esta orden?',
    text: "No vas a poder revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteOrder(id).then(value =>  allOrder())
      Swal.fire(
        'Eliminada!',
        'La orden ha sido borrada.',
        'success'
      )
    }
  })
}

const handleCancel = function(id){
  let body = {
    status: false,
    id: id,
  }
  Swal.fire({
    title: 'Quieres terminar esta orden?',
    text: "No vas a poder revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      updateOrder(body).then(value =>  allOrder())
      setOpen(false)
      Swal.fire(
        'Terminada!',
        'La orden ha sido cerrada.',
        'success'
      )
    }
  })
}

const handleSubmit = function(e){
  e.preventDefault();
  let body = {
    clientId: order.clientId,
    commentA: order.commentA,
    createdAt: order.createdAt,
    dateA: order.dateA,
    days: order.days,
    id: order.id,
    cant: order.cant,
    price: order.price,
    tool: order.tool
  }
  updateOrder(body).then(value =>  allOrder())
  setOpen(false)
  Swal.fire({
    icon: 'success',
    title: 'Orden modificada correctamente!',
    showConfirmButton: false,
    timer: 1500
  })
}
    
  return (
    <div style={{marginTop:'100px', marginLeft:'250px',  marginRight:'20px'}}> 
      
    <Toolbar />
    <h5>Herramientas</h5>
    <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
      <Link color="inherit" href="/home" >
        Inicio
      </Link>
      <Typography color="textPrimary">Alquileres</Typography>
    </Breadcrumbs>
    

    <Grid container spacing={3}  className={classes.root}>
        <Grid item xs>
          <Paper className={classes.paper}>

            {/* Buscador de Usuarios */ }
            <div className={classes.root}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  /* {console.log(value)} *//* 
                  console.log("ESTE es valueee ",value)
                  console.log("ESta es NEWVALUE ",newValue) */
                  
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);/* 
                  console.log("ESTE ES EL NEW INPUT VALUE DE USUARIOS ", newInputValue) */
                  
                }}
                id="controllable-states-demo"
                options={options}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Buscar cliente.." variant="outlined" />}
                />
            </div>
          </Paper>
        </Grid>
        <Grid item xs>
        <Paper className={classes.paper}>

            {/* Buscador de Herramientas */ }
            <div className={classes.root}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValueTools(newValue);/* 
                  console.log("ESTE es valueee ",value)
                  console.log("ESta es NEWVALUE ",newValue) */
                  
                }}
                inputValue={inputValueTools}
                onInputChange={(event, newInputValue) => {
                  setInputValueTools(newInputValue);/* 
                  console.log("ESTE ES EL DE HERRAMEINTASS ", newInputValue) */
                  
                }}
                id="controllable-states-demo"
                options={optionsTools}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Buscar herramienta.." variant="outlined" />}
              />
            </div>
          </Paper>
        </Grid>
        
      </Grid>
  
      {/* MODAL DE EDITAR ORDENES 
        const [order, setOrder] = React.useState({dateA:'', days:"" ,tool:'',commentA:'', price:'' ,cant:'',clientId:''});
      */}
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Modificar Orden</DialogTitle>
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>

                  <Grid item sm={12} md={6}>
                    <TextField
                      onChange={handleChange}
                      label="Fecha desde "
                      id="fdesde"
                      name="dateA"
                      type="date"
                      className={clsx(classes.margin, classes.textField)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      defaultValue={order.days}
                      id="days"
                      name="days"
                      label="Dias(*)"
                      InputLabelProps={{
                          shrink: true,
                        }}
                      type="text"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      id="cant"
                      name="cant"
                      label="Cantidad(*)"
                      type="number"
                      defaultValue={order.cant}
                      InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <TextField
                      onChange={handleChange}
                      label="Precio "
                      id="precio"
                      name="price"
                      defaultValue={order.price}
                      className={clsx(classes.margin, classes.textField)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item sm={12} md={12}>
                    <TextField  style={{width:"100%"}}
                      className={classes.root}
                      id="comentario"
                      name="commentA"
                      label="Comentario *"
                      defaultValue={order.commentA}
                      multiline
                      rows={4}
                      variant="outlined"
                      maxWidth
                      alignItems="flex-start"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>                        
                      <FormControl className={classes.formControl}>
                      <NativeSelect   
                        onChange={handleChange}                        
                        name="clientId"
                        id="clientId"
                      >
                      { <option>Elegir Cliente </option>}
                        {all_client.map((ele)=>{
                          return <option value={ele.id}>{ele.name+" "+ele.lastname}</option>
                        })
                        }
                        
                      </NativeSelect>
                      </FormControl>         
                  </Grid>
                  
                  <Grid item sm={12} md={6}>                        
                      <FormControl className={classes.formControl}>
                      <NativeSelect   
                        onChange={handleChange}                        
                        name="tool"
                        id="tool"
                      >
                      { <option>Elegir Herramienta </option>}
                        {all_tools.map((ele)=>{
                          return <option value={ele.name}>{ele.name}</option>
                        })
                        }
                        
                      </NativeSelect>
                      </FormControl>         
                  </Grid>

                </Grid>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button id="send" type="submit" color="primary">
                  Agregar
                </Button>
              </DialogActions>
              </DialogContent>
              </form>
            </Dialog>
    
    
    <TableContainer component={Paper} >
     <Table className={classes.table} aria-label="simple table" className="table-hover">
       <TableHead>
         <TableRow>
           <TableCell>Herramienta</TableCell>
           <TableCell align="center">Cliente</TableCell>
           <TableCell align="center">Cantidad</TableCell>
           <TableCell align="center">Desde</TableCell>
           <TableCell align="center">Hasta</TableCell>
           <TableCell align="center">Restan/D</TableCell>
           <TableCell align="center">Precio U $</TableCell>
           <TableCell align="center">Total $</TableCell>           
           <TableCell align="center">Nota</TableCell>
           <TableCell align="center">Acciones</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>


         {orderBuscada ?  orderBuscada.map((row) => (

           
          <TableRow key={row.id}>            

            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} component="th" scope="row">
            {row.tool}
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} component="th" scope="row">
              {/* {row.clientId} */}
              {
            all_client.map((client)=>{
                return parseInt(row.clientId) === parseInt(client.id) ? client.name+' '+client.lastname : ''
              })
              }
            </TableCell> 
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">{row.cant}</TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
              {
              global.finicio = moment(row.dateA).utc().format('L') 
              }
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
              {                
              global.ffin = moment(row.dateA).add(row.days, 'days').utc().format('L')
              }
              
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
              
            
            <Badge badgeContent={1000} badgeContent={ global.diasRest = moment(row.dateA).add(row.days, 'days').diff(moment(), 'days')}
                {...global.diasRest < 1 ? {color:"secondary"} : {color:"primary"}  }                
              />
              
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">{row.price}</TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
            {
              row.price * row.cant
            }
            </TableCell>             
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">{row.commentA}</TableCell>
            
            
            <TableCell align="center">
            <IconButton aria-label="edit" onClick={()=>handleOpen(row)} disabled={row.status === false ? true : false}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={()=>handleDelete(row.id)} >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="cancel" onClick={()=>handleCancel(row.id)} disabled={row.status === false ? true : false}>
              <CloseIcon/>
            </IconButton>
            </TableCell>
          </TableRow>
          )) :  all_order ? all_order.map((row) => (

          <TableRow key={row.id}>            

            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} component="th" scope="row">
              {row.tool}
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} component="th" scope="row">
              {/* {row.clientId} */}
              {
              all_client.map((client)=>{
                  return parseInt(row.clientId) === parseInt(client.id) ? client.name+' '+client.lastname : ''
              })
              }
            </TableCell> 
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">{row.cant}</TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
              {
                global.finicio = moment(row.dateA).utc().format('L') 
              }
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
              {                
                global.ffin = moment(row.dateA).add(row.days, 'days').utc().format('L')
              }
              
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
                
            
              <Badge badgeContent={1000} badgeContent={ global.diasRest = moment(row.dateA).add(row.days, 'days').diff(moment(), 'days')}
                {...global.diasRest < 1 ? {color:"secondary"} : {color:"primary"}  }                
              />
                
            </TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">{row.price}</TableCell>
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">
              {
                row.price * row.cant
              }
            </TableCell>             
            <TableCell style={{"color": row.status === false ? '#ccc' : '' }} align="center">{row.commentA}</TableCell>
            
              
            <TableCell align="center">
            <IconButton aria-label="edit" onClick={()=>handleOpen(row)} disabled={row.status === false ? true : false}>
            <EditIcon />
            </IconButton>
            <IconButton aria-label="delete"  onClick={()=>handleDelete(row.id)} >
            <DeleteIcon />
            </IconButton>
            <IconButton aria-label="cancel" onClick=
            {()=>handleCancel(row.id)} disabled={row.status === false ? true : false}>
              <CloseIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
        )) : "No se han encontrado herramientas alquiladas."}
       </TableBody>
     </Table>
   </TableContainer>
   <TablePagination
     rowsPerPageOptions={[5, 10, 25]}
     component="div"
     count={all_tools.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onChangePage={handleChangePage}
     onChangeRowsPerPage={handleChangeRowsPerPage}
   />



    </div>
  )}
  const mapDispatchToProps = dispatch => {
    return {
      getAllTools: () => dispatch(getAllTools()),
      deleteTools: ( idTools) => dispatch(deleteTools( global.idTools)),
      insertTools: (inputTools) => dispatch(insertTools(inputTools)),
      allOrder: () => dispatch(allOrder()),
      updateOrder: (body)=> dispatch(updateOrder(body)),
      getClient: ()=> dispatch(getClient()),
      clientOrder: (input)=> dispatch(clientOrder(input)),
      toolsOrder: (inputTools)=> dispatch(toolsOrder(inputTools)), 
      deleteOrder: (id)=> dispatch(deleteOrder(id)), 
      
    }
  }
  const mapStateToProps = state => {
    return {
      all_tools: state.all_tools,       
      all_order: state.all_order,
      all_client: state.all_client
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Orders);