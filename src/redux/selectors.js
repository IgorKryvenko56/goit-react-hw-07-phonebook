import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = ({ contacts }) => contacts.items;
export const selectFilter = ({ contacts }) => contacts.filter;
export const selectStatus = ({ contacts }) => contacts.status;
export const selectError = ({ contacts }) => contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

// import { createSelector } from '@reduxjs/toolkit';

// export const selectContacts = ({ contacts }) => contacts.items;
// export const selectFilter = ({ filter }) => filter;
// export const selectStatus = ({ contacts }) => contacts.status;
// export const selectError = ({ contacts }) => contacts.error;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectFilter],
//   (contacts, filters) => {
//     const filteredContacts = [...contacts].filter(({ name }) =>
//       name.toUpperCase().includes(filters.name.toUpperCase())
//     );

//     return filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
//   }
// );
