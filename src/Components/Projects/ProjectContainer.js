import React, { useEffect } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// import {
//     FavoriteBorderIcon,
//     FavoriteIcon,
//     ChatBubbleOutlineIcon,
// } from '@mui/icons-material';

function ProjectContainer({ project, isOwner, userId }) {
    const {
        _id,
        projectName,
        projectDescription,
        projectPicture,
        likes,
        comments,
    } = project;
    useEffect(() => {}, []);
    return (
        <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card sx={{ margin: "10px", padding: "10px" }}>
                <img
                    className={"projectImageContainer"}
                    src={projectPicture}
                    style={{
                        maxWidth: "100%",
                    }}
                />
                <Typography variant={"h5"} textAlign={"left"}>
                    {projectName}
                </Typography>
                <Typography variant={"subtitle2"} textAlign={"left"}>
                    {projectDescription}
                </Typography>
                <hr />
                {isOwner ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    margin: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {likes.length} <FavoriteBorderIcon />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    margin: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {comments.length} <ChatBubbleOutlineIcon />
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        {" "}
                        <Grid container spacing={2}>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    margin: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button variant={"filled"}>
                                    {likes.length} <FavoriteBorderIcon />
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    margin: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button variant={"filled"}>
                                    {comments.length} <ChatBubbleOutlineIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}

                {isOwner ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    variant={"filled"}
                                    sx={{
                                        background: "green",
                                        color: "white",
                                        padding: "5px",
                                        width: "100%",
                                        "&:hover": {
                                            background: "#37B47C",
                                        },
                                    }}
                                >
                                    <Link
                                        to={`/projects/edit/${_id}`}
                                        style={{
                                            color: "white",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Edit
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant={"filled"}
                                    sx={{
                                        background: "#B43737",
                                        color: "white",
                                        padding: "5px",
                                        width: "100%",
                                        "&:hover": {
                                            background: "#CB1919",
                                        },
                                    }}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <></>
                )}
            </Card>
        </Grid>
    );
}

export default ProjectContainer;
