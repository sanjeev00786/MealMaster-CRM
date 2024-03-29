// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import { TextField } from '@mui/material';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import AssignDriverModalButton from './AssignDriverModalButton';
// import MiniDrawer from '../../../components/SideMenu/SideMenu';
// import Loader from '../../../components/Loader/Loader';
// import SideBarMenu from '../../../components/NewSideMenu/NewSideMenu';
// import { API_BASE_URL,ENDPOINTS } from '../../../apiConfig.js';
// import { provider_id } from "../../../util/localStorage.js";
// import './delivery-schedule.css'

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // with exampleArray.slice().sort(exampleComparator)
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     { id: 'checkbox', numeric: false, disablePadding: true, label: 'Select' },
//     { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
//     { id: 'contact', numeric: false, disablePadding: false, label: 'Contact' },
//     { id: 'plan', numeric: false, disablePadding: true, label: 'Plan Type' },
//     { id: 'city', numeric: false, disablePadding: true, label: 'City' },
//     { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
//   ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected, onGetSelectedRows, onUpdateParent } = props;

//   console.log(props)
//   const [openModal, setOpenModal] = React.useState(false);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   // const handleAssignDriver = (selectedDriver, providerId) => {
//     // Do something with the selected driver and providerId in the parent component
//   //   console.log('Selected driver:', selectedDriver);
//   //   console.log('Provider ID:', providerId);
//   // };

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Schedule Delivery
//         </Typography>
//       )}

//      {numSelected > 0 ? (
//         <Tooltip title="Assign Driver">
//           <IconButton onClick={handleOpenModal}>
//             <AssignDriverModalButton providerId={provider_id} onAssignDriver={onGetSelectedRows} updateParent={onUpdateParent}/>
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function DeliveryScheduleTable() {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('address');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [rows, setRows] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [updateFlag, setUpdateFlag] = React.useState(false);

//   const toggleUpdateFlag = () => {
//     setUpdateFlag((prevFlag) => !prevFlag);
//     setSelected([]);
//   };

//   // ${ENDPOINTS.GET_MEAL_PLAN}
//   const fetchData = React.useCallback(async () => {
//     try {
//       // First request to get meal plans
//       const mealPlanResponse = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`);

//       if (!mealPlanResponse.ok) {
//         throw new Error('Network response was not ok for meal plans');
//       }

//       const mealPlanData = await mealPlanResponse.json();

//       // Assuming the first plan in the response is the correct one
//       const selectedMealPlan = mealPlanData.data[0];

//       // Second request to get customer information
//       const customerResponse = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_ALL_CUSTOMER}${selectedMealPlan.provider_id}`);

//       if (!customerResponse.ok) {
//         throw new Error('Network response was not ok for customers');
//       }

//       const customerData = await customerResponse.json();

//       // Transform data using the plan information
//       const transformedData = customerData.data.customers.filter(customer => customer.is_assigned_driver != true).map((customer) => {
//         // Find the matching plan_id in mealPlanData
//         const matchedPlan = mealPlanData.data.find(plan => plan.plan_id === customer.plan_id);

//         return {
//           id: customer.customer_id,
//           name: customer.name,
//           contact: customer.contact,
//           plan_id: customer.plan_id,
//           plan: matchedPlan ? matchedPlan.plan_name : 'Unknown Plan',
//           city: 'City', // You can replace this with the actual city information from the API
//           address: customer.address,
//         };
//       });

//       setRows(transformedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false); // Set loading state to false after fetching data, regardless of success or error
//     }
//   }, [updateFlag]);

//   React.useEffect(() => {
//     fetchData();
//   }, [fetchData]);  // Pass the fetchData function as a dependency

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = stableSort(rows, getComparator(order, orderBy))
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const getSelectedRows = () => {
//       const selectedDetails = rows.filter(row => selected.includes(row.id));
//       console.log(selectedDetails);
//       return selectedDetails;
//     };

//   if (loading) {
//     return <p>Loading...</p>; // Render a loading indicator while data is being fetched
//   }

//   return (
//     <div className='delivery-schedule-container'>
//       <div className="sideBarMenu">
//         <SideBarMenu currentPage='/delivery-schedule'/>
//       </div>
//     <Box sx={{ width: '100%' }} className='delivery-schedule-table'>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} onGetSelectedRows={getSelectedRows} onUpdateParent={toggleUpdateFlag}/>
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = isSelected(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           'aria-labelledby': labelId,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                     </TableCell>
//                     <TableCell align="left">{row.name}</TableCell>
//                     <TableCell align="left">{row.contact}</TableCell>
//                     <TableCell align="left">{row.plan}</TableCell>
//                     <TableCell align="left">{row.city}</TableCell>
//                     <TableCell align="left">{row.address}</TableCell>
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </Box>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import unpaidSign from "../../../component-assets/unpaidSign.svg";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { provider_id } from "../../../util/localStorage.js";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import { Link } from "react-router-dom";
import supabase from "../../../supabase";

import Button from "@mui/material/Button";
import AssignDriverModalButton from "./AssignDriverModalButton";

export default function DeliveryScheduleTable() {
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const navigate = useNavigate();
  const { pageNum } = useParams();

  const fetchData = async (pageNum) => {
    try {
      const customerStatusUrl = `${ENDPOINTS.GET_CUSTOMER_BY_STATUS}${provider_id}?page=${pageNum}&status=active`;
      const res = await apiHelper.get(customerStatusUrl);
      console.log(res.data);
      setRecords(res.data.customers);
      setFilteredData(res.data.customers);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNum);
  }, [pageNum]);

  const handlePageChange = (event, newPage) => {
    navigate(`/delivery-schedule/${newPage}`);
  };

  const handleRefreshList = () => {
    console.log('********List refreshed!');
    fetchData(pageNum);
  };

  // const handleRefreshList = async () => {
  //   console.log("********List refreshed!");
  //   await fetchData(pageNum); 
  //   const assignedCustomers = records.filter((customer) => customer.is_assigned_driver);
  //   console.log(assignedCustomers)
  //   await fetchDriverNamesForAssignedCustomers(assignedCustomers);
  // };

  // const fetchDriverNamesForAssignedCustomers = async (assignedCustomers) => {
  //   try {
   
  //     for (const customer of assignedCustomers) {
  //       const { data: assignedTiffinData, error } = await supabase
  //         .from("assigned_tiffin")
  //         .select("driver_name")
  //         .eq("customer_id", customer.customer_id)
  //         .single();
  
  //       if (error) {
  //         throw new Error(`Error fetching driver name for customer ${customer.id}: ${error.message}`);
  //       }
  
  //       customer.driverName = assignedTiffinData ? assignedTiffinData.driver_name : "Unknown";
  //     }
  
  //     setFilteredData([...filteredData]);
  //   } catch (error) {
  //     console.error("Error fetching driver names for assigned customers:", error);
  //   }
  // };


  const columns = [
    {
      name: "Customer's Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Plan",
      selector: (row) => (row.plans ? row.plans.plan_name : "N/A"),
    },
    {
      name: "Quantity",
      selector: (row) => row.tiffin_quantity,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Driver",
      selector: (row) => (row.is_assigned_driver ? "Assigned" : (
        <>
          <img src={unpaidSign} alt="Unpaid" />
          <span> Not Assigned </span>
        </>
      )),
      sortable: true,
    },
  ];

  const handleFilter = (event) => {
    const newData = records.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleSelectedData = ({ selectedRows }) => {
    console.log(selectedRows);
    setSelectedRows(selectedRows);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onUpdateParent = () =>{
    // fetchData(pageNum);
  }

  return (
    <div className="customer-page-container">
      <div className="sideBarMenu">
        <SideBarMenu currentPage="/delivery-schedule/1" />
      </div>
      <div className="mobileSideBarMenu">
        <AnchorTemporaryDrawer />
      </div>

      <div className="customer-page">
        <div className="page-heading">
          <h1 className=" underline">Schedule Delivery</h1>
        </div>
        <div
          className="search-addButtton-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              onChange={handleFilter}
              className="search-input"
            />
          </div>
          <div className="assign-driver-button">
            {/* <Button variant="contained" onClick={toggleModal}>
              Assign Driver
            </Button> */}
            <AssignDriverModalButton
              isOpen={isModalOpen}
              onClose={toggleModal}
              providerId={provider_id}
              onAssignDriver={selectedRows}
              // updateParent={setRefreshList(!refreshList)} 
              onSuccess={handleRefreshList}
            />
          </div>
        </div>
        <div className="data-table-parent-container">
          <h2>Select customer(s) to assign a driver:</h2>
          <div className="data-table-container">
            <DataTable
              columns={columns}
              data={filteredData}
              selectableRows
              onSelectedRowsChange={handleSelectedData}
              selectableRowDisabled={(row) => row.is_assigned_driver}
            />
          </div>

          <div className="pagination-container">
            <Pagination count={totalPages} onChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*

Things need to be fixed in this , 
1. look into the checkboxes, sometime they get selected if we press cancel on opening the button. need to check thi 
2. page is not refreshing by itself. 
3. need to store driver name in the assigned tiffin and get the name from that table show in the assigned field. 
4. Two things to confirm:- 
  a). Is is the is_Driver_assigned updating every 24 hours. 
  b). Is the assigned table getting empty every 24 hours. 

*/
