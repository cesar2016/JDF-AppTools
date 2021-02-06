import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
// tables
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import "moment/locale/es";

import {
  getAllTools,
  insertTools,
  getClient,
  updateTools,
  order,
  updateStock,
  all_tools
} from "../../actions/index";
import { connect } from "react-redux";

moment.locale("es");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Alquilar({
  getClient,
  all_client,
  getAllTools,
  all_tools,
  order,
  orders,
  updateTools,
  updateStock,
}) {
  useEffect(() => {
    getAllTools();
    getClient();
  }, []);

  const classes = useStyles();
  const [priceRender, setPriceRender] = React.useState();
  const [fecharender, setFecharender] = React.useState();
  const [stock, setStock] = React.useState();
  const [input, setInput] = React.useState({
    clientId: "",
    tool: "",
    idTool: "",
    dateA: "",
    days: "",
    cant: "",
    price: "",
    commentA: "",
  });
   
  if (input.idTool && input.cant) {
    console.log('IDtOLLL ',input.idTool)
    getAllTools()
    let herramientas = all_tools.filter((el) => el.name == input.idTool);

    setStock(herramientas[0].stock);       
    setInput({
      ...input,
      idTool: null,
    });
    
    global.idToolsGood = herramientas[0].id;
    getAllTools()   
    
  }
   

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); 
      
  };

  const handleChangeStock = (e) => {
    setInput({
      ...input,
      tool: e.target.value,
      idTool: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    order(input);
    getAllTools()

    Swal.fire({
      icon: "success",
      title: "Orden agregada correctamente!",
      showConfirmButton: false,
      timer: 1500,
    });


    updateStock(stock - input.cant, global.idToolsGood);
    getAllTools()

    document.getElementById("formOrders").reset();
    document.getElementById("client").innerHTML = "";
    document.getElementById("herramienta").innerHTML = "";

    
  };

   

  const handleFechaFin = function () {
    const inicio = document.getElementById("fdesde").value;
    const dias = document.getElementById("days").value;

    let fechafinal = moment(inicio).add(dias, "days").utc().format("L");
    setFecharender(fechafinal);
    //document.getElementById('diass').value = "Este es moment"
    /* console.log("ESTA ES LA FECHA FINAL",fecharender) */
    //inicio && dias ? lastDate : " "
  };

  const handlePrice = function () {
    const price = document.getElementById("precio").value;
    const quantity = document.getElementById("cant").value;

    let setValue = parseInt(price) * parseInt(quantity);
    setPriceRender(setValue);

    /* console.log("Desp del handler", priceRender) */
  };

  /* console.log('asda', fecharender) */

  return (
    <div
      style={{ marginTop: "100px", marginLeft: "250px", marginRight: "20px" }}
    >
      <Toolbar />
      <h5>Alquilar</h5>
      <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
        <Link color="inherit" href="/">
          Inicio
        </Link>
        <Typography color="textPrimary">Herramientas</Typography>
      </Breadcrumbs>
      <form id="formOrders" onSubmit={handleSubmit}>
        <div className={classes.root}>
          <TextField
            id="client"
            name="clientId"
            select
            label="Nombre Cliente"
            required
            onChange={handleChange}
            helperText="Selecciones un cliente"
            variant="outlined"
          >       
            
            {all_client
              ? all_client.map((option) => (                
                  <MenuItem id="sel1" value={option.id}>
                   {option.name + " " + option.lastname} 
                  </MenuItem>
                  
                ))
              : "No hay clientes cargados"}              
          </TextField>

          <TextField
            id="herramienta"
            name="tool"
            required
            select
            label="Herramienta"
            onChange={handleChangeStock}
            helperText="Seleccione una herramienta"
            variant="outlined"
          >
            {all_tools
              ? all_tools.map((option) => (
                  <MenuItem value={option.name}>{option.name}</MenuItem>
                ))
              : "Aun no hay herramintas cargadas"}
          </TextField>
          <TextField
            onChange={handleChange}
            label="Cantidad"
            id="cant"
            name="cant"
            type="number"
            helperText={stock ? "Stock actual: " + stock : null}
            required
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              inputProps: {
                max: stock,
                min: 1,
              },
            }}
            variant="outlined"
          />
        </div>
        <div className={classes.root}>
          <TextField
            onChange={handleChange}
            label="Fecha desde "
            id="fdesde"
            name="dateA"
            required
            type="date"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <TextField
            onChange={handleChange}
            onBlur={handleFechaFin}
            label="Cuantos dias lo alquilo "
            type="number"
            id="days"
            name="days"
            helperText={fecharender ? fecharender : null}
            required
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              inputProps: {
                min: 0,
              },
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <TextField
            onChange={handleChange}
            onBlur={handlePrice}
            label="Precio por unidad "
            id="precio"
            name="price"
            helperText={priceRender ? "$ " + priceRender : null}
            required
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <Grid item xs={12}>
            <TextField
              className={classes.root}
              id="comentario"
              name="commentA"
              label="Comentario *"
              // placeholer="Comentario"
              multiline
              rows={4}
              variant="outlined"
              maxWidth
              alignItems="flex-start"
              onChange={handleChange}
            />

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                alignItems="flex-start"    
              >
                ENVIAR
              </Button>
            </div>
          </Grid>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTools: () => dispatch(getAllTools()),
    insertTools: (inputTools) => dispatch(insertTools(inputTools)),
    getClient: () => dispatch(getClient()),
    updateTools: (tools) => dispatch(updateTools(tools)),
    order: (data) => dispatch(order(data)),
    updateStock: (stock, cantidad) => dispatch(updateStock(stock, cantidad)),
    getAllTools: () => dispatch(getAllTools())
  };
};

const mapStateToProps = (state) => {
  return {
    all_tools: state.all_tools,
    all_client: state.all_client,
    orders: state.orders,
    getAllTools: state.getAllTools
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alquilar);
