import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from "react-redux";
import { getClient, insertClient, updateClient } from "../../actions/index";

const useStyles = makeStyles({
  button:{
    marginBottom:12,
  },
  paper: { minWidth: "500px" },
});

const ModalCustomers = ({ open, onClose, onOpen, getClient, all_client, insertClient, updateClient }) => {
  const classes = useStyles();
  // const defaultCustomer = {name:'',dni:'',phone:'',email:'',adress:''};

  const [inputClient, setInputClient] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    adress: "",
    phone: "",
    bussiness: ""
  })

  const handleChangeClient = function(e) {
    setInputClient({
    ...inputClient,
    [e.target.name]: e.target.value
   });
  }

  console.log(inputClient)

  const handleSubmit = function(e){
    e.preventDefault();
    insertClient(inputClient);
    getClient();
    updateClient(all_client)
  }

  const handleOpen = () => {
     onOpen(true,inputClient);
  };
  const handleClose = () => {
     onClose(false);
  };

  console.log('A ver el state de CLientes', all_client)

  return (

    <div>
    <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleOpen()}>
      Nuevo Cliente
    </Button>
      <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo Cliente</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
              <Grid container spacing={4}>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     margin="dense"
                     id="name"
                     name="name"
                     defaultValue={all_client.name}
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
                     defaultValue={all_client.lastname}
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
                     defaultValue={all_client.dni}
                     margin="dense"
                     id="dni"
                     name="dni"
                     label="Dni(*)"
                     type="number"
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
                   defaultValue={all_client.email}
                   margin="dense"
                   id="email"
                   name="email"
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
                   defaultValue={all_client.adress}
                   margin="dense"
                   id="adress"
                   name="address"
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
                   defaultValue={all_client.phone}
                   margin="dense"
                   id="phone"
                   name="phone"
                   label="Teléfono(*)"
                   type="number"
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
                   defaultValue={all_client.bussiness}
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
        </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => updateClient(all_client)} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = dispatch => {

  return {
    getClient: () => dispatch(getClient()),
    insertClient: (inputClient) => dispatch(insertClient(inputClient))
  }
  }

  const mapStateToProps = state => {
    return {
      all_client: state.all_client,
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ModalCustomers)
