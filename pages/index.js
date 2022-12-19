import React from "react";
// import { makeStyles } from '@mui/styles';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector,useDispatch } from 'react-redux';
import { add, comment } from '../store/movies';

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     justifyContent: "initial"
//   },
//   title: {
//     marginBottom: "30px"
//   },
//   header: {
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between"
//   },
//   card: {
//     maxWidth: 300,
//     // margin: "auto",
//     transition: "0.3s",
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
//     "&:hover": {
//       boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
//     }
//   },
//   media: {
//     paddingTop: "56.25%"
//   },
//   content: {
//     textAlign: "left",
//     padding: theme.spacing.unit * 3
//   },
//   divider: {
//     margin: `${theme.spacing.unit * 3}px 0`
//   },
//   heading: {
//     fontWeight: "bold"
//   },
//   subheading: {
//     lineHeight: 1.8
//   },
//   avatar: {
//     display: "inline-block",
//     border: "2px solid white",
//     "&:not(:first-of-type)": {
//       marginLeft: theme.spacing.unit
//     }
//   }
// }));

const card = {
  image:
    "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
  name: "Nature Around Us",
  description:
    "We are going to learn different kinds of species in nature that live together to form amazing environment."
};

export default function SimpleCard() {
//   const classes = useStyles();

  const [cards, setCards] = React.useState([card]);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

  return (
    <div className="root">
      <div>
        <h1>Movies</h1>
      </div>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={movies}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            dispatch(add({ name: 'Pulp Fiction', description: 1994 }));
          }}
        >
          Add Movie
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            setCards([]);
          }}
        >
          Reset
        </Button>
      </div>

      <Grid container spacing={1}>
        {movies.map((movie, index) => {
          const { name, description } = movie;
          return (
            <Grid item key={index}>
              <Card key={index}>
                <CardContent>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"caption"}
                  >
                    {description}
                  </Typography>
                  <Divider light />
                  {faces.map(face => (
                    <Avatar key={face} src={face} />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
