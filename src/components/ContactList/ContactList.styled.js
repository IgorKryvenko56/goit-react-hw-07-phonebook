import styled from 'styled-components';

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ContactName = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

export const ContactNumber = styled.span`
  color: #888;
`;

export const DeleteButton = styled.button`
  background-color: #ff4b4b;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;


