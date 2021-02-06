import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ModalCategory from "./ModalCategory";
import Swal from "sweetalert2/src/sweetalert2.js";
//Modal
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

import { withStyles } from '@material-ui/core/styles'; 
import Badge from '@material-ui/core/Badge'; 
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// tables
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
// buttons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

//Buscador
import { Autocomplete } from "@material-ui/lab";

import {
  getAllTools,
  insertTools,
  getAllCategory,
  updateTools,
  deleteTools,
  allOrder,
} from "../../actions/index";
import { connect } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  marginBreadcumb: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 12,
  },
});

function Tools({
  getAllTools,
  all_tools,
  allOrder,
  getAllCategory,
  all_categorys,
  insertTools,
  updateTools,
  deleteTools,
  all_order,
}) {
  useEffect(() => {
    getAllTools();
    getAllCategory();
    allOrder();
  }, []);
  const classes = useStyles();
  const [tools, setTool] = React.useState({
    categoryId: null,
    createdAt: null,
    description: null,
    id: null,
    name: null,
    orderId: null,
    status: null,
    stock: null,
    stocktotal: null,
    updatedAt: null,
  });
  const [open, setOpen] = React.useState(false);

  //ESTADOS DEL BUSCADOR
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");

  //OPCIONES DEL BUSCADOR;
  var options = all_tools.map((ele) => {
    return ele.name;
  });
  var herramientaBuscada;
  if (value) {
    herramientaBuscada = all_tools.filter((ele) => ele.name == value);
  }

  const handleOpen = (item) => {
    setTool(item);
    setOpen(true);
  };
  const handleClose = () => {
    setTool({
      categoryId: null,
      createdAt: null,
      description: null,
      id: null,
      name: null,
      orderId: null,
      status: null,
      stock: null,
      stocktotal: null,
      updatedAt: null,
    });
    setOpen(false);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    console.log("El ID De TOOLS", tools.id);

    if (tools.id) {
      let data = {
        id: tools.id,
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        stock: document.getElementById("stock").value,
        //stocktotal: document.getElementById(11).value,
        categoryId: document.getElementById("categoryId").value,
      };
      global.data = data;
      updateTools(data);
      handleClose();
    } else {
      insertTools(tools);
      getAllTools();
      getAllTools();
      handleClose();
    }
  };

  const handleChangeTools = function (e) {
    const { name, value } = e.target;
    setTool({
      ...tools,
      [name]: value,
    });
  };

  function toolDelete(id, name) {
    global.idTools = id;
    Swal.fire({
      title: "ATENCION!",
      text: "Vas a eliminar la herramient:  " + name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTools(id);
        getAllTools();
        getAllTools();
        Swal.fire("Eliminada!", "Con exito.", "success");
      }
    });
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, all_tools.length - page * rowsPerPage);

    const StyledBadge = withStyles((theme) => ({
      badge: {
        backgroundColor: '#4caf50',
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '10px',
        fontSize: 15
      },
    }))(Badge);

  return (
    <div
      style={{ marginTop: "100px", marginLeft: "250px", marginRight: "20px" }}
    >
      <Toolbar />
      <h5>Herramientas</h5>
      <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
        <Link color="inherit" href="/">
          Inicio
        </Link>
        <Typography color="textPrimary">Herramientas</Typography>
      </Breadcrumbs>

      {/* Buscador de Herramientas */}
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar herramienta.."
              variant="outlined"
            />
          )}
        />
      </div>

      <Grid container direction="row" justify="flex-end" spacing={0}>
        <Grid item xs={5}>
          <Grid container direction="row" spacing={0}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleOpen(tools)}
              >
                Nueva Herramienta
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  {tools.id ? "Modificar" : "Nueva"} Herramienta
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={6}>
                        <TextField
                          required
                          autoFocus
                          margin="dense"
                          defaultValue={tools.name}
                          id="name"
                          name="name"
                          label="Nombre(*)"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="text"
                          fullWidth
                          onChange={handleChangeTools}
                        />
                      </Grid>
                      <Grid item sm={12} md={6}>
                        <TextField
                          required
                          autoFocus
                          margin="dense"
                          defaultValue={tools.description}
                          id="description"
                          name="description"
                          label="Descripción(*)"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="text"
                          fullWidth
                          onChange={handleChangeTools}
                        />
                      </Grid>

                      <Grid item sm={12} md={6}>
                        <TextField
                          required
                          margin="dense"
                          id="stock"
                          name="stock"
                          label="Stock(*)"
                          type="number"
                          defaultValue={tools.stock}
                          InputLabelProps={{
                            inputProps: {
                              min: 0,
                            },
                            shrink: true,
                          }}
                          fullWidth
                          onChange={handleChangeTools}
                        />
                      </Grid>
                      <Grid item sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            onChange={handleChangeTools}
                            name="categoryId"
                            defaultValue={tools.categoryId}
                            id="categoryId"
                          >
                            {tools.id === null ? (
                              <option>Elegir categoria </option>
                            ) : (
                              "null"
                            )}
                            {all_categorys.map((cat) => {
                              return <option value={cat.id}>{cat.name}</option>;
                            })}
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
            </Grid>
            <Grid item xs={6}>
              <ModalCategory></ModalCategory>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Alquiladas</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {herramientaBuscada
              ? herramientaBuscada.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      {row.stock + "/" + row.stocktotal}
                    </TableCell>
                    <TableCell align="center">
                      {all_categorys.map((cat) => {
                        return cat.id === parseFloat(row.categoryId)
                          ? cat.name
                          : "";
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {row.stocktotal - row.stock  }
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleOpen(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => toolDelete(row.id, row.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : all_tools
              ? all_tools.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      {row.stock + "/" + row.stocktotal}
                    </TableCell>
                    <TableCell align="center">
                      {all_categorys.map((cat) => {
                        return cat.id === parseFloat(row.categoryId)
                          ? cat.name
                          : "";
                      })}
                    </TableCell>
                    <TableCell align="center">
                    <StyledBadge hidden={
                      row.stocktotal - row.stock === 0 ? true
                      : false
                    } badgeContent={
                      row.stocktotal - row.stock === 0 ? ''
                      : row.stocktotal - row.stock
                    } color="secondary">                       
                       
                      </StyledBadge>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleOpen(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => toolDelete(row.id, row.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : all_tools
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {row.stock + "/" + row.stocktotal}
                      </TableCell>
                      <TableCell align="center">
                        {all_categorys.map((cat) => {
                          return cat.id === parseFloat(row.categoryId)
                            ? cat.name
                            : "";
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {row.stocktotal - row.stock}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpen(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => toolDelete(row.id, row.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTools: () => dispatch(getAllTools()),
    deleteTools: (idTools) => dispatch(deleteTools(global.idTools)),
    insertTools: (inputTools) => dispatch(insertTools(inputTools)),
    getAllCategory: () => dispatch(getAllCategory()),
    updateTools: (tools) => dispatch(updateTools(tools)),
    allOrder: () => dispatch(allOrder()),
  };
};

const mapStateToProps = (state) => {
  return {
    all_tools: state.all_tools,
    all_categorys: state.all_categorys,
    all_order: state.all_order,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
