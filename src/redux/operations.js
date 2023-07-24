import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
 import fetchAPI from './fetchContactsAPI';

const API_BASE_URL = 'https://64a3a8f2c3b509573b5660c3.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const contacts = state.contacts.items;
      const duplicateName = contacts.find(contact => contact.name === name);
      const duplicateNumber = contacts.find(
        contact => contact.number === number
      );

      if (duplicateName) {
        throw new Error('Contact with the same name already exists');
      }

      if (duplicateNumber) {
        throw new Error('Contact with the same number already exists');
      }
      const response = await axios.post(`${API_BASE_URL}/contacts`, {
        name,
        number,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return id;
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (error) {
      throw error;
    }
  }
);
