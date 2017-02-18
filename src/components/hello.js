import React from 'react';

const UserList = props => (
  <div>
    <h1>Hello, {props.name}!</h1>
    <h2>It is {new Date().toLocaleTimeString()}.</h2>
  </div>
);

export default UserList;
