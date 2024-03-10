import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AssignDriverModalButton from './AssignDriverModalButton';
import MiniDrawer from '../../../components/SideMenu/SideMenu';
import Loader from '../../../components/Loader/Loader';
import SideBarMenu from '../../../components/NewSideMenu/NewSideMenu';

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
  return order === 'desc'
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
    { id: 'checkbox', numeric: false, disablePadding: true, label: 'Select' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'contact', numeric: false, disablePadding: false, label: 'Contact' },
    { id: 'plan', numeric: false, disablePadding: true, label: 'Plan Type' },
    { id: 'city', numeric: false, disablePadding: true, label: 'City' },
    { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
  ];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id} 
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onGetSelectedRows, onUpdateParent } = props;
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  // const handleAssignDriver = (selectedDriver, providerId) => {
    // Do something with the selected driver and providerId in the parent component
  //   console.log('Selected driver:', selectedDriver);
  //   console.log('Provider ID:', providerId);
  // };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Schedule Delivery
        </Typography>
      )}

     {numSelected > 0 ? (
        <Tooltip title="Assign Driver">
          <IconButton onClick={handleOpenModal}>
            <AssignDriverModalButton providerId="5de05e6c-162f-4293-88d5-2aa6bd1bb8a3" onAssignDriver={onGetSelectedRows} updateParent={onUpdateParent}/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export default function DeliveryScheduleTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('address');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [updateFlag, setUpdateFlag] = React.useState(false);

  const toggleUpdateFlag = () => {
    setUpdateFlag((prevFlag) => !prevFlag);
    setSelected([]);
  };


  const fetchData = React.useCallback(async () => {
    try {
      // First request to get meal plans
      const mealPlanResponse = await fetch('http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3');
  
      if (!mealPlanResponse.ok) {
        throw new Error('Network response was not ok for meal plans');
      }
  
      const mealPlanData = await mealPlanResponse.json();
  
      // Assuming the first plan in the response is the correct one
      const selectedMealPlan = mealPlanData.data[0];
  
      // Second request to get customer information
      const customerResponse = await fetch(`http://localhost:3001/api/customer/provider/get-all-customers/${selectedMealPlan.provider_id}`);
  
      if (!customerResponse.ok) {
        throw new Error('Network response was not ok for customers');
      }
  
      const customerData = await customerResponse.json();

  
      // Transform data using the plan information
      const transformedData = customerData.data.customers.filter(customer => customer.is_assigned_driver != true).map((customer) => {
        // Find the matching plan_id in mealPlanData
        const matchedPlan = mealPlanData.data.find(plan => plan.plan_id === customer.plan_id);
  
        return {
          id: customer.customer_id,
          name: customer.name,
          contact: customer.contact,
          plan_id: customer.plan_id,
          plan: matchedPlan ? matchedPlan.plan_name : 'Unknown Plan',
          city: 'City', // You can replace this with the actual city information from the API
          address: customer.address,
        };
      });
  
      setRows(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching data, regardless of success or error
    }
  }, [updateFlag]);  
  

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);  // Pass the fetchData function as a dependency

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
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
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getSelectedRows = () => {
      const selectedDetails = rows.filter(row => selected.includes(row.id));
      console.log(selectedDetails);
      return selectedDetails;
    };

  if (loading) {
    return <Loader loading={loading}/>; // Render a loading indicator while data is being fetched
  }

  return (
    <div>
      <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between"}}>
      <div className="sideBarMenu">
        <SideBarMenu currentPage='/delivery-schedule'/>
      </div>      
        <Paper sx={{ width: '100%', mt:8}}>
          <EnhancedTableToolbar numSelected={selected.length} onGetSelectedRows={getSelectedRows} onUpdateParent={toggleUpdateFlag}/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.contact}</TableCell>
                      <TableCell align="left">{row.plan}</TableCell>
                      <TableCell align="left">{row.city}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
        </Paper>
      </Box>
    </div>
  );
}
