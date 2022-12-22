import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { filter, getMoviesAsync } from '../store/movies';
import Link from "next/link"

export default function SimpleCard() {

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  let isFetchMovie = false;

  useEffect(() => {
    console.log("getMoviesAsync", isFetchMovie);
    isFetchMovie = true;
    dispatch(getMoviesAsync());
  }, [!isFetchMovie]);

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
      <br/>
      <Grid container spacing={2} columns={8}>
        {movies.map((movie, index) => {
          const { Film, Year, Id } = movie;
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
                  <Link href={`/details?Id=${Id}`}>
                    details
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
