import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import { FormContainer, Input, Button } from './ContactForm.styled';

function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };



  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
       onChange={e => setName(e.target.value)}
        // onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        // onChange={handleChange}
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


//   const handleChange = e => {
//     const { name, value } = e.target;
//     setContact(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

