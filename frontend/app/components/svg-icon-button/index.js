import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles(theme => ({
  button: {},
  imageTitle: {},
  icon: {
    fontSize: "4rem"
  }
}));

export default function SVGIconButton({ svg, title, ...props }) {
  const classes = useStyles();
  return (
    <ButtonBase
      focusRipple
      style={{ display: "flex", flexDirection: "column" }}
      {...props}
    >
      <SvgIcon className={classes.icon}>{svg}</SvgIcon>
      <Typography
        component="span"
        variant="subtitle1"
        color="inherit"
        className={classes.imageTitle}
        align="center"
      >
        {title}
      </Typography>
    </ButtonBase>
  );
}
