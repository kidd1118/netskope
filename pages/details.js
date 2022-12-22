import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesAsync } from '../store/movies';
import { getCommentsAsync, addCommentsAsync, add } from '../store/comments';
import { useRouter } from 'next/router'

export default function SimpleCard() {
    
    const router = useRouter()
    const { Id } = router.query

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.list.filter(item => item.Id == Id));

    useEffect(() => {
        console.log("getMoviesAsync");
        dispatch(getMoviesAsync(Id));
    }, [(!movies || !movies.length) && Id]);

    const { Film, Year, Audiencescore, Genre, LeadStudio, Profitability, RottenTomatoes, WorldwideGross } 
        = movies.length ? movies[0] : {};

    const comments = useSelector((state) => state.comments.list);
    let isFetchComment = false;

    useEffect(() => {
        console.log("getCommentsAsync");
        isFetchComment = true;
        dispatch(getCommentsAsync(Id));
    }, [!isFetchComment && Id]);

    let [tfComment, setComment] = useState("");
    let [tfName, setName] = useState("");
    let [errorComment, setErrorComment] = useState(false);
    let [errorName, setErrorName] = useState(false);

    const isValid = (value) => {
        const retult = value ? true : false;
        return retult;
    }
  return (
    <div className="root">
      {
        <Card key={Id} onClick={() => console.log(Film)}>
            <CardContent>
                <h1>{Film}</h1>
                <br/>
                <span>Genre: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {Genre}
                </Typography>
                <br/>
                <span>Studio: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {LeadStudio}
                </Typography>
                <br/>
                <span>User Rating: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {Audiencescore}
                </Typography>
                <br/>
                <span>Profitability: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {Profitability}
                </Typography>
                <br/>
                <span>Rotten Tomatoes Rating: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {RottenTomatoes}
                </Typography>
                <br/>
                <span>Worldwide Gross: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {WorldwideGross}
                </Typography>
                <br/>
                <span>Year Release: </span>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"string"}
                    gutterBottom
                >
                    {Year}
                </Typography>
            </CardContent>
        </Card>
      }
      <br/>
      <h3>Comments</h3>
      <Divider light />
      <br/>
      <Grid container spacing={2} columns={8}>
        {comments.map((comment, index) => {
          const { Name, Comment, Id } = comment;
          return (
            <Grid item key={index}>
              <Card key={index} onClick={() => console.log(Name)}>
                <CardContent>
                    <span>Name: </span>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"string"}
                        gutterBottom
                    >
                        {Name}
                    </Typography>
                    <br/>
                    <span>Comment: </span>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"string"}
                        gutterBottom
                    >
                        {Comment}
                    </Typography>
                    <br/>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <br/>
      <TextField required onChange={(newValue) => { setErrorComment(!isValid(newValue.target.value)); setComment(newValue.target.value); }}
        id="tfComment" label="Your comment" variant="outlined" value={tfComment} error={errorComment} />
      <br/>
      <br/>
      <TextField required onChange={(newValue) => { setErrorName(!isValid(newValue.target.value)); setName(newValue.target.value); }} 
        id="tfName" label="Your name" variant="outlined" value={tfName} error={errorName} />
      <br/>
      <br/>
      <div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            const validName = isValid(tfName);
            const validComment = isValid(tfComment);
            if (validName && validComment) {
                dispatch(addCommentsAsync({ Name: tfName, Comment: tfComment, mId: Id }));
                dispatch(add({ Name: tfName, Comment: tfComment, mId: Id }));
                setName("");
                setComment("");
                setErrorName(false);
                setErrorComment(false);
            } else {
                setErrorName(!validName);
                setErrorComment(!validComment);
            }
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
