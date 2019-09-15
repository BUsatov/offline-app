import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ButtonRouter from "app/components/button-router";

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
  id,
  name,
  category,
  userName,
  createdAt,
  resources,
  description,
  availability
}) {
  const classes = useStyles();
  const date = new Date(createdAt);
  const participants = (resources.filter(r => !!r.assignee) || []).length;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {category.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        subheader={`Created: ${date.toLocaleDateString()} by Bohdan Usatov`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Participants: {participants} / {resources.length}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ButtonRouter to={`/events/${id}`} aria-label="add to favorites">
          More Details
        </ButtonRouter>
      </CardActions>
    </Card>
  );
}
