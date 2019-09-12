import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function EventItem({
  name,
  category,
  userName,
  createdAt,
  description,
  availability
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {category.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        subheader={`Created: ${createdAt} by Bohdan Usatov`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button aria-label="add to favorites">More Details</Button>
      </CardActions>
    </Card>
  );
}
