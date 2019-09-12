import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { SnackbarContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  }
}));

export const NotificationsContext = React.createContext();

export default function ConsecutiveSnackbars({ children }) {
  const queueRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClick = message => {
    queueRef.current.push({
      message,
      key: new Date().getTime()
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  const classes = useStyles();
  return (
    <NotificationsContext.Provider value={handleClick}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby="message-id"
          message={
            <span id="message-id">
              {messageInfo ? messageInfo.message : undefined}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    </NotificationsContext.Provider>
  );
}
