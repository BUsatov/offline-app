import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export default function ButtonRouter(params) {
  return <Button component={AdapterLink} {...params} />;
}
