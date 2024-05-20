import React from "react";
import Alert from "@mui/material/Alert";

const Message = ({ variant, severity, children }) => {
  return (
    <Alert variant={variant} severity={severity}>
      {children}
    </Alert>
  );
};

export default Message;
