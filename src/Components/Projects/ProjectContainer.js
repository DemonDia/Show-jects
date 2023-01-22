import React, { useEffect } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";

// import {
//     FavoriteBorderIcon,
//     FavoriteIcon,
//     ChatBubbleOutlineIcon,
// } from '@mui/icons-material';

function ProjectContainer({
    project,
    isOwner,
    userId,
    handleLike,
    handleDelete,
}) {
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
                                <Button
                                    variant={"filled"}
                                    onClick={() => {
                                        handleLike(_id, userId);
                                    }}
                                >
                                    <Link
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {likes.length}
                                        {likes.includes(userId) ? (
                                            <>
                                                <FavoriteIcon
                                                    sx={{
                                                        color: "red",
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <FavoriteBorderIcon />
                                            </>
                                        )}
                                    </Link>
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
                                    <Link
                                        to={`/projects/${_id}`}
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {comments.length}{" "}
                                        <ChatBubbleOutlineIcon />
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}

                {isOwner ? (
                    <>
                        <hr />
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
                                        <CreateIcon />
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
                                    onClick={() => {
                                        handleDelete(_id);
                                    }}
                                >
                                    <DeleteOutlineIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                            to={`/projects/${_id}`}
                        >
                            <Button
                                variant={"filled"}
                                sx={{
                                    background: "#309F6E",
                                    width: "100%",
                                    margin: "10px auto",
                                    padding: "10px",
                                    "&:hover": {
                                        background: "green",
                                    },
                                }}
                            >
                                See More
                            </Button>
                        </Link>
                    </>
                )}
            </Card>
        </Grid>
    );
}

export default ProjectContainer;
