import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    Card,
    Grid,
    Paper,
    Typography,
    Button,
    Link,
    Box,
    TextField,
} from "@mui/material";
// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function IndividualProjectPage() {
    const [loading, setLoading] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const navigate = useNavigate();
    const id = useSelector((state) => state.id);
    const { projectId } = useParams();
    const [comment, setComment] = useState("");
    // const [projectPicture, setProjectPicture] = useState("");
    // const [projectName, setProjectName] = useState("");
    // const [projectDescription, setProjectDescription] = useState("");
    // const [status, setStatus] = useState(0);
    // const [projectLinks,setProjectLinks] = useState([])

    const loadPage = async () => {
        setLoading(true);
        await getCurrentProject(projectId).then(() => {
            setLoading(false);
        });
    };

    const getCurrentProject = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_LINK}/projects/${projectId}`)
            .then((res) => {
                const project = res.data.data;
                setCurrentProject(project);
            });
    };

    // ==================likes==================

    // ==================comments==================
    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            <h1>Individual Project</h1>
            {loading ? (
                <></>
            ) : (
                <>
                    {currentProject ? (
                        <>
                            {" "}
                            <Card
                                sx={{
                                    margin: "10px auto;",
                                    width: {
                                        xs: "90vw",
                                        md: "70vw",
                                        lg: "40vw",
                                    },
                                }}
                            >
                                <Paper variant="outlined">
                                    <img
                                        src={currentProject.projectPicture}
                                        alt={"Add image"}
                                        style={{
                                            width: "50%",
                                            margin: "auto",
                                        }}
                                    />
                                </Paper>
                                <Paper variant="outlined">
                                    <Typography
                                        variant="h6"
                                        textAlign={"left"}
                                        sx={{
                                            padding: "10px;",
                                            margin: "10px;",
                                        }}
                                    >
                                        Project Name:{" "}
                                        {currentProject.projectName}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        textAlign={"left"}
                                        sx={{
                                            padding: "10px;",
                                            margin: "10px;",
                                        }}
                                    >
                                        Description:{" "}
                                        {currentProject.projectDescription}
                                    </Typography>
                                    <hr />
                                    <Typography
                                        variant="h6"
                                        textAlign={"left"}
                                        sx={{
                                            padding: "10px;",
                                            margin: "10px;",
                                        }}
                                    >
                                        Links:
                                    </Typography>
                                    <ul>
                                        {currentProject.projectLinks.map(
                                            (projectLink) => {
                                                const { linkName, url } =
                                                    projectLink;
                                                return (
                                                    <li>
                                                        <Link
                                                            href={url}
                                                            target={"_blank"}
                                                        >
                                                            {linkName}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                    <hr />
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
                                                    // handleLike(projectId, userId);
                                                }}
                                                sx={{
                                                    width: "100%",
                                                }}
                                            >
                                                <Link
                                                    style={{
                                                        color: "black",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {
                                                        currentProject.likes
                                                            .length
                                                    }
                                                    {currentProject.likes.includes(
                                                        id
                                                    ) ? (
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
                                            {currentProject.comments.length}
                                            <ChatBubbleOutlineIcon />
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <TextField
                                                    sx={{
                                                        width: "100%",
                                                    }}
                                                    value={comment}
                                                    multiline
                                                    label="Write a comment ..."
                                                    onChange={(e) => {
                                                        setComment(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button>Comment</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <hr />
                                    {currentProject.comments.length > 0 ? (
                                        <>
                                            {currentProject.comments.map(
                                                (comment) => {
                                                    const {
                                                        commenterId,
                                                        commenterName,
                                                        commentContent,
                                                        commentDate,
                                                    } = comment;
                                                    return (
                                                        <Box
                                                            style={{
                                                                margin: "10px auto",
                                                                padding: "10px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant={"h6"}
                                                                textAlign={
                                                                    "left"
                                                                }
                                                            >
                                                                {commenterName}{" "}
                                                                at {commentDate}
                                                            </Typography>
                                                            <Typography
                                                                variant={
                                                                    "subtitle2"
                                                                }
                                                                textAlign={
                                                                    "left"
                                                                }
                                                            >
                                                                {commentContent}
                                                            </Typography>
                                                        </Box>
                                                    );
                                                }
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Paper>
                            </Card>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
}

export default IndividualProjectPage;
