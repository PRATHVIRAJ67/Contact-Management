import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ContactsTable = ({
  contacts,
  fetchContacts,
  setSelectedContact,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}) => {
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' });
      fetchContacts();
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy]?.localeCompare(b[orderBy]);
    } else {
      return b[orderBy]?.localeCompare(a[orderBy]);
    }
  });

  const paginatedContacts = sortedContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3} sx={{ p: 3, m: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="primary">
          Contact Management
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map(
                (headCell) => (
                  <TableCell
                    key={headCell}
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell)}
                    >
                      {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact._id} hover>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => setSelectedContact(contact)}
                    color="info"
                    sx={{ marginRight: 1 }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(contact._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item xs={12} sm="auto">
          <TablePagination
            component="div"
            count={contacts.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
            sx={{
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-actions':
                {
                  color: 'primary.main',
                },
              display: 'flex',
              justifyContent: 'center',
              '@media (max-width: 600px)': {
                '& .MuiTablePagination-toolbar': {
                  flexDirection: 'column',
                  alignItems: 'center',
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContactsTable;
