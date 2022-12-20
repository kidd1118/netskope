import { useEffect } from "react";
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
import { useSelector, useDispatch } from 'react-redux';
import { add, filter, getMoviesAsync } from '../store/movies';

export default function SimpleCard() {

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, [dispatch]);

  const options = [];
  movies.forEach(item => {
      if (options.indexOf(item.Film) < 0) {
          options.push(item.Film);
      }
  });

  return (
    <div className="root">
      <div>
        <h1>Movies</h1>
      </div>
      <Divider dark="true" />
      <br/>
      <Autocomplete
        disablePortal
        id="cb-movies"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Movie" />}
        onChange={(event, newValue) => dispatch(filter(newValue))}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            dispatch(add({ Film: 'Pulp Fiction', Year: 1994 }));
          }}
        >
          Add Movie
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            dispatch(getMoviesAsync());
          }}
        >
          Reset
        </Button>
      </div>
      <br/>
      <Grid container spacing={2} columns={8}>
        {movies.map((movie, index) => {
          const { Film, Year } = movie;
          return (
            <Grid item key={index}>
              <Card key={index} onClick={() => console.log(Film)}>
                <CardContent>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    {Film}
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"caption"}
                  >
                    {Year}
                  </Typography>
                  <Divider light />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
