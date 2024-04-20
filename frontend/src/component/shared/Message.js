import React from "react";
import Alert from "@mui/material/Alert";

const Message = ({ varient, children }) => {
  return (
    <Alert variant={varient} severity="success">
      {children}
    </Alert>
  );
};

export default Message;
