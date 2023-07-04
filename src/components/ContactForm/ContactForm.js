import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { saveContact } from '../../redux/contactsSlice';
import {
  FormContainer,
  Button,
} from './ContactForm.styled';

const initialValues = {
  id: '',
  name: '',
  number: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [contact, setContact] = useState(initialValues);
  const { name, number } = contact;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicateName = contacts && contacts.some((contact) => contact.name === name);

    if (isDuplicateName) {
      alert('This contact name already exists in the phone book!');
    } else {
      dispatch(saveContact(contact));
      setContact(initialValues);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="Phone number"
        required
      />
      <Button type="submit">
        Add Contact
      </Button>
    </FormContainer>
  );
};


export default ContactForm;
