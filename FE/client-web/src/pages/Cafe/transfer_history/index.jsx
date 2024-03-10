import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MuiAlert from '@mui/material/Alert';
import './styles.css';

const TransferHistoryPage = () => {
  const [transferData, setTransferData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modId, setModId] = useState(0);
  const [modName, setModName] = useState('');
  const [modifyQty, setModifyQty] = useState(0);
  const [isModifyQtyValid, setIsModifyQtyValid] = useState(false);

  const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisible] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  useEffect(() => {
    retrieveInventoryItems();
  }, []);

  useEffect(() => {
    setIsModifyQtyValid(!isNaN(modifyQty) && modifyQty >= 1);
  }, [modifyQty]);

  function setModalDetails(item_id, item_name) {
    setModId(item_id);
    setModName(item_name);
    setModalVisible(true);
  }

  async function retrieveInventoryItems() {
    // const data = await fetch('http://127.0.0.1:8000/all_transactions');
    const data = await fetch('https://ims-be-j66p.onrender.com/all_transactions');
    const response = await data.json();
    
    console.log(response.transactions);
    setTransferData(response.transactions);
  }

  async function deleteTransaction(transaction_id) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }

    // const response = await fetch(`http://127.0.0.1:8000/delete_transaction/${transaction_id}`, requestOptions);
    const response = await fetch(`https://ims-be-j66p.onrender.com/delete_transaction/${transaction_id}`, requestOptions);
    const data = await response.json();

    console.log(data.response);
  }

  async function modifyRequestedQty() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'transacted_amount': modifyQty
      })
    }

    // const response = await fetch(`http://127.0.0.1:8000/update_transaction/${modId}`, requestOptions);
    const response = await fetch(`https://ims-be-j66p.onrender.com/update_transaction/${modId}`, requestOptions);
    const data = await response.json();

    console.log(data.response);

    if (data.response === 'Transaction Updated') {
      setModalVisible(false);
      retrieveInventoryItems();
    }
  }

  const handleDeleteConfirmation = (transactionId) => {
    setModId(transactionId);
    setDeleteConfirmationDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    await deleteTransaction(modId);
    setDeleteConfirmationDialogVisible(false);
    setDeleteSuccessMessage('Item deleted successfully!');
    retrieveInventoryItems(); 
  };

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  async function search(searched_item) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'search': searched_item
      })
    }

    // const data = await fetch('http://127.0.0.1:8000/search_transfer_requests', requestOptions);
    const data = await fetch('https://ims-be-j66p.onrender.com/search_transfer_requests', requestOptions);
    const response = await data.json();

    setTransferData(response.transactions);
  }

  return (
    <Box>
      <Typography variant="h5">Transfer Requests</Typography>
      <Typography variant='body1'>Listed below are all the transfer requests made within the system.</Typography>

      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Search Transactions..."
            size="small"
            sx={{ marginTop: '7.5%', marginLeft: "84%", paddingBottom: "1rem" }}
            onChange={(search_item) => search(search_item.target.value)}
          />
        </div>
      </div>
      <TableContainer component={Paper} id='transfers-table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow id='header-row'>
              <TableCell align="center" className='table-header'>Requested Item</TableCell>
              <TableCell align="center" className='table-header'>Quantity</TableCell>
              <TableCell align="center" className='table-header'>Transactor</TableCell>
              <TableCell align="center" className='table-header'>Request Date</TableCell>
              <TableCell align="center" className='table-header'>Approval Status</TableCell>
              <TableCell align="center" className='table-header'>Options</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transferData.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell component="th" align="center">{transfer.transacted_item.item_name}</TableCell>
                <TableCell align="center">{transfer.transacted_amount}</TableCell>
                <TableCell align="center">{transfer.transactor}</TableCell>
                <TableCell align="center">{formatDateTime(transfer.date_created)}</TableCell>
                <TableCell align="center">{transfer.approval}</TableCell>
                {transfer.approval === 'Pending' && (
                  <TableCell align="center">
                    <EditOutlinedIcon onClick={() => setModalDetails(transfer.id, transfer.transacted_item.item_name)} />
                    <DeleteOutlineOutlinedIcon onClick={() => handleDeleteConfirmation(transfer.id)} />
                  </TableCell>
                )}
                {transfer.approval !== 'Pending' && (
                  <TableCell align="center">
                    -
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='modal'>
                <Typography variant="h5" id="modal-title">Modify Transaction Quantity Request</Typography>

                <Typography variant="h6" id='item-title'>{modName}</Typography>
                <TextField 
                    label="Change amount" 
                    type='number' 
                    id="modal-input-field" 
                    size='small' 
                    onChange={(qty) => setModifyQty(qty.target.value)}
                    defaultValue={0}
                >
                </TextField>

                <Box id='modal-buttons-container'>
                    <Button variant='outlined' onClick={() => modifyRequestedQty() } disabled={!isModifyQtyValid}>Modify</Button>
                    <Button variant='outlined' onClick={() => setModalVisible(false) }>Cancel</Button>
                </Box>
            </div>
        </Modal>

        <Dialog
  open={deleteConfirmationDialogVisible}
  onClose={() => setDeleteConfirmationDialogVisible(false)}
>
  <DialogTitle sx={{backgroundColor: '#8F011B ', color: '#fff' }}>
    Confirm Delete
  </DialogTitle>
  <DialogContent>
    <Typography variant="body1">
      Are you sure you want to delete this transaction?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => handleConfirmDelete()}>Yes</Button>
    <Button onClick={() => setDeleteConfirmationDialogVisible(false)}>No</Button>
  </DialogActions>
</Dialog>


      
      <Snackbar
        open={Boolean(deleteSuccessMessage)}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          {deleteSuccessMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default TransferHistoryPage;
