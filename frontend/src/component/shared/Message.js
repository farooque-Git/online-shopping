import React from "react";
import Alert from "@mui/material/Alert";

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} severity="success">
      {children}
    </Alert>
  );
};

export default Message;
