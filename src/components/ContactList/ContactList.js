import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/selectors';
import {
  ListContainer,
  ListItem,
  ContactName,
  ContactNumber,
  DeleteButton,
} from './ContactList.styled';
import { nanoid } from 'nanoid';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ListContainer>
      {filteredContacts.map(contact => (
        <ListItem key={nanoid()}>
          <ContactName>{contact.name}</ContactName>
          <ContactNumber>{contact.number}</ContactNumber>
          <DeleteButton type="button" onClick={() => handleDelete(contact.id)}>
            Delete
          </DeleteButton>
        </ListItem>
      ))}
    </ListContainer>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;


