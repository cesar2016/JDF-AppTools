import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from "react-redux";
import { insertCategory} from "../../actions/index";
import Swal from 'sweetalert2'


const useStyles = makeStyles((theme) => ({
  button:{
    marginBottom:12,
  },
  paper: {
    minWidth: "500px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  nativeInput:{
    minWidth:500
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const ModalCategory = ({insertCategory}) =>{

  const [inputCategory, setInputCategori] = useState({ nameCategory: ''});

  const handleChangeCategory = function(e) {
    setInputCategori({
    ...inputCategory,
    [e.target.name]: e.target.value.toUpperCase()

   });
  }


  const handleSubmit = function(e){
    e.preventDefault();
    const categoria = inputCategory.nameCategory

    Swal.fire(
      'Bien!',
      'Categoria '+categoria+' Insertada con Exito',
      'success'
    )
    insertCategory(inputCategory)
    handleClose();

  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (

    <div>

    <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
      Nueva categoria
    </Button>
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nueva Categoria</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
             <Grid item sm={12}>
               <TextField
                required
                 autoFocus
                 margin="dense"
                 id="nameCategory"
                 name="nameCategory"
                 label="Descripción(*)"
                 InputLabelProps={{
                    shrink: true,
                  }}
                 type="text"
                 fullWidth
                 onChange={handleChangeCategory}
               />
             </Grid>
          </Grid>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Agregar
          </Button>
        </DialogActions>
        </DialogContent>
        </form>

      </Dialog>

    </div>
  );
}

const mapDispatchToProps = dispatch => {

  return {
    insertCategory: (inputCategory) => dispatch(insertCategory(inputCategory))

  }
  }

  const mapStateToProps = state => {
    return {
        date_user: state.date_user


    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ModalCategory)
