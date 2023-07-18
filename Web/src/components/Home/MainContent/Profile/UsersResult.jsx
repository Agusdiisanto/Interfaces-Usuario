import React from "react";
import User from "./User";


const UsersResult = ({ users}) => {

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user}/>
      ))}
    </div>
  );
};

export default UsersResult;
