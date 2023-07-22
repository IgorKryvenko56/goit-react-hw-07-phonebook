import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter, selectFilter } from '../../redux/contactsSlice';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <label>
      Filter contacts by name:
      <input type="text" value={filter} onChange={handleFilterChange} />
    </label>
  );
}

export default Filter;

