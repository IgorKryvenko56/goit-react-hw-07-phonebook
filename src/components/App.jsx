import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, PhonebookImage } from './App.styled';
import phonebookImage from '../asset/phonebook.png';
import {
  fetchContacts,
  saveContact,
  deleteContact,
  updateFilter,
  selectContacts,
  selectFilter,
  selectIsLoading,
  selectError,
} from '../redux/contactsSlice';
import { persistor } from '../redux/store';

const API_BASE_URL = 'https://64a3a8f2c3b509573b5660c3.mockapi.io';

const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter) || '';
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = async contact => {
    const isDuplicateName = contacts.find(
      c => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicateName) {
      alert('This contact already exists in the list!');
    } else {
      const newContact = { ...contact, id: nanoid() };
      try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        });
        if (response.ok) {
          dispatch(saveContact(newContact));
          alert('Contact added successfully!');
        } else {
          throw new Error('Failed to add contact');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to add contact');
      }
    }
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteContact(id));
        alert('Contact deleted successfully!');
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete contact');
    }
  };

  const handleFilter = value => {
    dispatch(updateFilter(value));
  };

  const filterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter && filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(normalizedFilter || '')
    );
  };

  const filteredContacts = filterContacts();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Container>
        <h1>Phonebook</h1>
        <PhonebookImage src={phonebookImage} alt="Phonebook" />
        <ContactForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <Filter
              value={filter !== undefined ? filter : ''}
              onChange={handleFilter}
            />
            <ContactList contacts={filteredContacts} onDelete={handleDelete} />
          </>
        )}
      </Container>
    </PersistGate>
  );
};

export default App;
