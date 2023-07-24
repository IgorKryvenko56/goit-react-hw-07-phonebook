import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import {
  selectFilteredContacts,
  
  selectFilter,
} from '../../redux/selectors';

import {
  ListContainer,
  ListItem,
  ContactName,
  ContactNumber,
  DeleteButton,
} from './ContactList.styled';


function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleDelete = id => {
    dispatch(deleteContact(id)); // Dispatch the deleteContact action with the contact ID
  };


  return (
     <ListContainer>
       {filteredContacts.map(contact => (
         <ListItem key={contact.id}>
           <ContactName>{contact.name}</ContactName>
           <ContactNumber>{contact.number}</ContactNumber>
           <DeleteButton type="button" onClick={() => handleDelete(contact.id)}>
{/* Add onClick handler */}
             Delete
           </DeleteButton>
         </ListItem>
      ))}
     </ListContainer>
   );
 };

export default ContactList;