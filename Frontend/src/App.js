import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import ContactsTable from './ContactsTable';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:5000/contacts');
    setContacts(response.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management
      </Typography>
      <ContactForm
        fetchContacts={fetchContacts}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <ContactsTable
        contacts={contacts}
        fetchContacts={fetchContacts}
        setSelectedContact={setSelectedContact}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </Container>
  );
}

export default App;
