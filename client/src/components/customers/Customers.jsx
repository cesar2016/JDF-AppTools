import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
// buttons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//Buscador
import { Autocomplete } from '@material-ui/lab';

//Modal
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import { getClient, deleteClient, updateClient, insertClient } from '../../actions/index';
import { connect } from 'react-redux';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  marginBreadcumb:{
    marginBottom:10,
  },
  button:{
    marginBottom:12,
  }
});

function Customers({ getClient, all_client, deleteClient, updateClient, insertClient }) {
  const classes = useStyles();

  useEffect(() => {
    getClient();
    },[])

  const [open, setOpen] = React.useState(false);
  const [client, setClient] = React.useState({name:'', lastname:"" ,dni:'',phoneA:'', city:'' ,email:'',address:'', bussiness:""});
  
  //ESTADOS DEL BUSCADOR
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');


  //OPCIONES DEL BUSCADOR;
  var options = all_client.map((ele) => {
    return (
      ele.name + " " + ele.lastname
    )
    
  })
  var usuarioBuscado;
  if(value){
    usuarioBuscado = all_client.filter((ele) => ele.name + " " + ele.lastname == value )
  }

 
  const handleOpen = (item) => {
      setClient(item)
      setOpen(true)
  };
  const handleClose = () => {
    setClient({name:null,
             lastname:null,
             dni:null,
             description:null,
             phoneA:null,
             city:null,
             email:null,
             address:null,
             bussiness:null
            })
    setOpen(false)
  };


  const handleSubmit = function(e){
  e.preventDefault();
  // console.log('El ID De CLIENT', client.id)

  if(client.id){
    let customer = {
      id: client.id,
      name: document.getElementById('name').value,
      lastname: document.getElementById('lastname').value,
      dni: document.getElementById('dni').value,
      phoneA: document.getElementById('phoneA').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
      bussiness: document.getElementById('bussiness').value,
      address: document.getElementById('address').value
      }
    global.customer = customer
    updateClient(customer)
    console.log('EL customerrr  ',customer)
    handleClose()
  }else{
    insertClient(client);
    handleClose()
  }
 
}

  const handleChangeClient = function(e) {
    const {id, value } = e.target
      setClient({
      ...client,
      [id]: value,
    });
  }

   
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function clientDelete(id, name, lastname){  
    global.idClient = id     
    Swal.fire({
     title: 'ATENCION!',
     text: "Vas a eliminar a: " + name +" "+lastname ,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, eliminar'
   }).then((result) => {
     if (result.isConfirmed) {
      deleteClient(id)
      getClient();
      getClient();
       
       Swal.fire(
         'Eliminado!',
         'Con exito.',
         'success'
       )
     }
   })    
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, all_client.length - page * rowsPerPage)

  
  return (
    <div style={{marginTop:'100px', marginLeft:'250px',  marginRight:'20px'}}>
    <Toolbar />
    <h5>Clientes</h5>
    <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
      <Link color="inherit" href="/" >
        Inicio
      </Link>
      <Typography color="textPrimary">Clientes</Typography>
    </Breadcrumbs>
    
    {/* Buscador de Usuarios */}
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          
          
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Buscar cliente.." variant="outlined" />}
      />
    </div>


    <Grid container>
       <Grid item sm={12} align="right">
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleOpen(client)}>
            Nuevo Cliente
          </Button>
            <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{client.id ? 'Modificar' : 'Nuevo'} Cliente</DialogTitle>
              <form onSubmit={handleSubmit}>
        <DialogContent>
              <Grid container spacing={4}>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     margin="dense"
                     id="name"
                     defaultValue={client.name}
                     label="Nombre/s(*)"
                     InputLabelProps={{
                        shrink: true,
                      }}
                     type="text"
                     fullWidth
                     onChange={handleChangeClient}
                   />
                 </Grid>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     defaultValue={client.lastname}
                     margin="dense"
                     id="lastname"
                     name="lastname"
                     label="Apellido/s(*)"
                     InputLabelProps={{
                        shrink: true,
                      }}
                     type="text"
                     fullWidth
                     onChange={handleChangeClient}
                   />
                 </Grid>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     defaultValue={client.dni}
                     margin="dense"
                     id="dni"
                     name="dni"
                     label="Dni(*)"
                     type="text"
                     InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleChangeClient}
                   />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.email}
                   margin="dense"
                   id="email"
                   label="Email(*)"
                   type="email"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.address}
                   margin="dense"
                   id="address"
                   label="Dirección(*)"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.phoneA}
                   margin="dense"
                   id="phoneA"
                   name="phoneA"
                   label="Teléfono(*)"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.city}
                   margin="dense"
                   id="city"
                   name="city"
                   label="Ciudad(*)"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.bussiness}
                   margin="dense"
                   id="bussiness"
                   name="bussiness"
                   label="Empresa(*)"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
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
        </Grid>
    </Grid>
    <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>Nombre y Apellido</TableCell>
           <TableCell align="center">DNI</TableCell>
           <TableCell align="center">Teléfono</TableCell>
           <TableCell align="center">Email</TableCell>
           <TableCell align="center">Dirección</TableCell>           
           <TableCell align="center">Ciudad</TableCell>
           <TableCell align="center">Empresa</TableCell>
           <TableCell align="center">Acciones</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
       {usuarioBuscado ? usuarioBuscado.map((row) => (
           <TableRow key={row.name}>
             <TableCell component="th" scope="row">
               {row.name} {row.lastname}
             </TableCell>
             <TableCell align="center">{row.dni}</TableCell>
             <TableCell align="center">{row.phoneA}</TableCell>
             <TableCell align="center">{row.email}</TableCell>
             <TableCell align="center">{row.address}</TableCell>
             <TableCell align="center">{row.city}</TableCell>
             <TableCell align="center">{row.bussiness}</TableCell>
             <TableCell align="center">
             <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
               <EditIcon />
             </IconButton>
             <IconButton aria-label="delete" onClick={()=>clientDelete(row.id, row.name, row.lastname)}>
               <DeleteIcon />
             </IconButton>
             </TableCell>
           </TableRow>
         )) :
       
       all_client ? all_client.map((row) => (
           <TableRow key={row.name}>
             {/* {console.log("esto es row", row)} */}
             <TableCell component="th" scope="row">
               {row.name} {row.lastname}
             </TableCell>
             <TableCell align="center">{row.dni}</TableCell>
             <TableCell align="center">{row.phoneA}</TableCell>
             <TableCell align="center">{row.email}</TableCell>
             <TableCell align="center">{row.address}</TableCell>
             <TableCell align="center">{row.city}</TableCell>
             <TableCell align="center">{row.bussiness}</TableCell>
             <TableCell align="center">
             <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
               <EditIcon />
             </IconButton>
             <IconButton aria-label="delete" onClick={()=>clientDelete(row.id, row.name, row.lastname)}>
               <DeleteIcon />
             </IconButton>
             </TableCell>
           </TableRow>
         )) :
         
         all_client
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => (
          <TableRow key={row.name}>
             <TableCell component="th" scope="row">
               {row.name} {row.lastname}
             </TableCell>
             <TableCell align="center">{row.dni}</TableCell>
             <TableCell align="center">{row.phoneA}</TableCell>
             <TableCell align="center">{row.email}</TableCell>
             <TableCell align="center">{row.address}</TableCell>
             <TableCell align="center">{row.city}</TableCell>
             <TableCell align="center">{row.bussiness}</TableCell>
             <TableCell align="center">
             <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
               <EditIcon />
             </IconButton>
             <IconButton aria-label="delete" onClick={()=>clientDelete(row.id, row.name, row.lastname)}>
               <DeleteIcon />
             </IconButton>
             </TableCell>
           </TableRow>
        ))}
         {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows}}>
            <TableCell colSpan={8} />
          </TableRow>
        )}
       </TableBody>
     </Table>
   </TableContainer>
   <TablePagination
     rowsPerPageOptions={[5, 10, 25]}
     component="div"
     count={all_client.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onChangePage={handleChangePage}
     onChangeRowsPerPage={handleChangeRowsPerPage}
   />
    </div>
  )}

  const mapDispatchToProps = dispatch => {    
    return {
      getClient: () => dispatch(getClient()),
      deleteClient: (idClient) => dispatch(deleteClient(global.idClient)),
      insertClient: (client) => dispatch(insertClient(client)),
      updateClient: (customer) => dispatch(updateClient(global.customer))
    }
  }

  const mapStateToProps = state => {
    return {
      all_client: state.all_client,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Customers);