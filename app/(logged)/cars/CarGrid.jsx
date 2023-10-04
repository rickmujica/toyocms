"use client";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { visuallyHidden } from "@mui/utils";
import {
  Add,
  CloseOutlined,
  Edit,
  FileDownload,
  PlusOne,
  Search,
  SearchOutlined,
  Visibility,
} from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, InputAdornment, TextField } from "@mui/material";
import {CsvBuilder} from 'filefy';
import useWindowSize from "../../hooks/useWindowDimensions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nombre",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "Año",
  },
  {
    id: "seats",
    numeric: true,
    disablePadding: false,
    label: "Asientos",
  },
  {
    id: "fuel",
    numeric: false,
    disablePadding: false,
    label: "Combustible",
  },
  {
    id: "transmision",
    numeric: false,
    disablePadding: false,
    label: "Transmisión",
  },
  {
    id: "kilometers",
    numeric: true,
    disablePadding: false,
    label: "Kilometros",
  },
  {
    id: "plate",
    numeric: false,
    disablePadding: false,
    label: "Chapa",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Categoría",
  },
  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Marca",
  },
  {
    id: "color",
    numeric: false,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Ubicación",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Precio",
  },
  {
    id: "partial_price",
    numeric: true,
    disablePadding: false,
    label: "Precio Cuotas",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Estado",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="error"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "Seleccionar todos los vehiculos",
            }}
          />
        </TableCell>
        <TableCell padding="checkbox" align="center">
          Editar
        </TableCell>
        <TableCell padding="checkbox" align="center">
          Ver
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            padding="normal"
            // align='center'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDelete, selectedId, exportGrid } = props;
  const [open, setOpen] = React.useState(false);
  // const { handleDelete, selectedId } = props;
  const handleOpenDeleteDialog = () => {
    setOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpen(false);
  };

  return (
    <>
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}{" "}
          {`${numSelected > 1 ? "seleccionados" : "seleccionado"}`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Vehículos
        </Typography>
      )}

      {numSelected > 0 && (
        <>
        <Tooltip title="Descargar CSV">
          <IconButton onClick={exportGrid}>
          <FileDownload sx={{ color: "red", mr: 2 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="eliminar">
          <IconButton onClick={handleOpenDeleteDialog}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Tooltip>
        </>
      )}

      <Link href={`/cars/add`}>
        <Tooltip title="Agregar">
          <IconButton>
            <Add sx={{ color: "red" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </Toolbar>
    <Dialog
        open={open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {numSelected > 1 ?
          "Realmente desea eliminar estos vehiculos?"
          :
          "Realmente desea eliminar este vehiculo?"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta operación no puede deshacerse.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'red'}} onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button sx={{color: 'red'}} onClick={() => { handleDelete(selectedId); handleCloseDeleteDialog();}} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export default function CarGrid(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");

  const windowSize = useWindowSize();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  
  const createQueryString = (op, name, value) => {
    const params = new URLSearchParams(searchParams);
    if (op === "add") {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    return params.toString()
  };

  const applySearch = (queryString) => {
    // console.log("ACA ESTA EL PATHNAME en aplySearch", pathname)
    // console.log("ACA ESTA EL querystring en aplySearch", queryString)
    router.push(`${pathname}?${queryString}`);
  };

  const handleSearchClick = () => {
    const queryString = createQueryString("add", "search", searchValue);
    // console.log("ACA ESTA EL searchValue en handleSearch", searchValue)
    // console.log("ACA ESTA EL QUERYSTRING en handleSearch", queryString)
    applySearch(queryString);
  };

  const handleClearClick = () => {
    const queryString = createQueryString("del_one", "search", "");
    // console.log("ACA ESTA EL QUERYSTRING en handleClear", queryString);
    applySearch(queryString);
  };

  let cars = props?.cars ? JSON.parse(props.cars) : [];

  const editarDatos = (e, car) => {
    e.stopPropagation(); // don't select this row after clicking
    // console.log("SE LIMPIA QUERY PARAMS");
    router.replace("/cars", undefined, { shallow: true });
  };
  const verDatos = (e, car) => {
    e.stopPropagation(); // don't select this row after clicking
    router.replace("/cars", undefined, { shallow: true });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = cars.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    // console.log("ACA ESTA EL ESTADO selectedId", selectedId)
    // console.log("ACA ESTA LA VARIABLE NEWSELECTED", newSelected)
    // console.log("ACA ESTA LA VARIABLE name", name)

    setSelected(newSelected);
    setSelectedId(selectedId.concat(id))
  };

  const handleDelete = async (cars) => {
    
    // Realizar la petición fetch de eliminacion
    try {
      const response = await fetch('/api/cars/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cars),
      });
      
      const data = await response.json();
      
      // console.log("ACA VIENE LA DATA", data);

      if (data.success) {
        setSelected([]);
        setSelectedId([]);
        setTimeout(() => {
          router.refresh();
          router.replace("/cars", undefined, { shallow: true });
          }, "1000");
        }
    } catch (error) {

      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
    event.target.checked ? setRowsPerPage(25) : setRowsPerPage(10);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

  const visibleRows = stableSort(cars, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const widthString = String(windowSize.width - 5) + "px";

  

  const exportGrid = async () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString().slice(-2); // Para obtener los dos últimos dígitos del año
    const formattedDate = `${day}-${month}-${year}`;
    
    // Filtra el array completo de filas para obtener solo las filas seleccionadas
    const selectedData = cars.filter((row) => selected.includes(row.name)).map((car) => ({
      ...car,
      category: car.category.name,
      brand: car.brand.name,
      color: car.color.name,
      location: car.location.name,
    }));
    
  
    // Mapea los datos de las filas seleccionadas en el orden de las columnas
    const data = selectedData.map((rowData) =>
      headCells.map((columnDef) => rowData[columnDef.id])
    );
  
    // Exporta los datos a un archivo CSV
    new CsvBuilder(`vehiculos_usados_${formattedDate}.csv`)
      .setColumns(headCells.map((columnDef) => columnDef.label))
      .addRows(data)
      .exportFile();
  }

  return (
    <Box sx={{ width: "98%", m: "1%" }}>
      <Paper elevation={4} sx={{ width: "98%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
          selectedId={selectedId}
          exportGrid={exportGrid}
          />
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <TextField
            label="Buscar vehículo"
            value={searchValue}
            onChange={handleSearchChange}
            color="error"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                    {searchValue == "" ? (
                      ""
                    ) : (
                  <IconButton onClick={() => {
                          setSearchValue(''), handleClearClick();
                        }}>
                      <CloseOutlined />
                  </IconButton>
                    )}
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={handleSearchClick}>
            <SearchOutlined
              sx={{ ml: 2, fontSize: 30, color: "red" }}
            />
          </IconButton>
        </Box>
        <TableContainer sx={{ width: "auto" }}>
          <Table
            sx={{ minWidth: 750, width: "100%" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={cars.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer", overflow: "hidden" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="error"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/cars/edit/${row.id}`} onClick={editarDatos}>
                        <IconButton size="small">
                          <Edit fontSize="small" color="error" />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/cars/look/${row.id}`} onClick={verDatos}>
                        <IconButton size="small">
                          <Visibility fontSize="small" color="error" />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                    <TableCell align="center">{row.seats}</TableCell>
                    <TableCell align="center">{row.fuel}</TableCell>
                    <TableCell>{row.transmision}</TableCell>
                    <TableCell align="right">{row.kilometers}</TableCell>
                    <TableCell>{row.plate}</TableCell>
                    <TableCell>{row.category.name}</TableCell>
                    <TableCell>{row.brand.name}</TableCell>
                    <TableCell>{row.color.name}</TableCell>
                    <TableCell>{row.location.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.partial_price}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cars.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Filas por página"}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Disminuir interlineado"
      />
    </Box>
  );
}
