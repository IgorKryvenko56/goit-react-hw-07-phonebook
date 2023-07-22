import axios from 'axios';
const API_BASE_URL = 'https://64a3a8f2c3b509573b5660c3.mockapi.io';

axios.defaults.baseURL = API_BASE_URL;

async function fetchContacts() {
  const response = await axios.get('contacts');
  return response.data;
}

async function addContact(name, number) {
  const response = await axios.post('contacts', { name, number });
  return response.data;
}

async function deleteContact(id) {
  const response = await axios.delete(`contacts/${id}`);
  return response.data;
}

const fetchFunctions = { fetchContacts, addContact, deleteContact };

export default fetchFunctions;
