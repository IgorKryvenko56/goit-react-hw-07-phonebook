import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://64a3a8f2c3b509573b5660c3.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error) {
      throw error;
    }
  }
);

export const saveContact = createAsyncThunk(
  'contacts/saveContact',
  async contact => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to save contact');
      }
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

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(saveContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { updateFilter } = contactsSlice.actions;

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export default contactsSlice.reducer;
