import React, { useEffect, useState } from "react";
import {
    publicAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";

import {
    Card,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    TextField,
} from "@mui/material";
import Loader from "../../Components/General/Loader";

// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function IndividualProjectPage() {
    const [loading, setLoading] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = useSelector((state) => state.id);
    const { projectId } = useParams();
    const currentToken = localStorage.getItem("userToken");

    const loadPage = async () => {
        setLoading(true);
        await getCurrentProject(projectId);
        await publicAuthCheck(navigate)
            .then(async (res) => {
                const { name, id } = getCurrentUser(res);
                dispatch(userActions.login({ name, id }));
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout());
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
    const handleLike = async (projectId, userId) => {
        if (userId) {
            axios
                .put(
                    `${process.env.REACT_APP_API_LINK}/projects/like/${projectId}`,
                    {
                        userId,
                    },
                    { headers: { Authorization: `Bearer ${currentToken}` } }
                )
                .then(async (result) => {
                    await getCurrentProject();
                })
                .catch((err) => {});
        } else {
            alert("You must login to like or comment!");
        }
    };

    // ==================comments==================
    const [comment, setComment] = useState("");
    const username = useSelector((state) => state.username);
    const handleComment = async () => {
        axios
            .put(
                `${process.env.REACT_APP_API_LINK}/projects/comment/add/`,
                {
                    userId: id,
                    userName: username,
                    projectId,
                    comment,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(async (result) => {
                setComment("");
                await getCurrentProject();
            })
            .catch((err) => {});
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {currentProject ? (
                        <>
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
                                <br />
                                <Link
                                    to="/projects"
                                    sx={{ textAlign: "left", margin: "10px" }}
                                >
                                    Back
                                </Link>
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
                                            (projectLink, index) => {
                                                const { linkName, url } =
                                                    projectLink;
                                                return (
                                                    <li key={index}>
                                                        <a
                                                            href={url}
                                                            target={"_blank"}
                                                        >
                                                            {linkName}
                                                        </a>
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
                                                    handleLike(projectId, id);
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
                                    {id ? (
                                        <>
                                            {" "}
                                            <Box>
                                                <Grid container>
                                                    <Grid item xs={10}>
                                                        <TextField
                                                            sx={{
                                                                width: "100%",
                                                                margin: "10px auto",
                                                            }}
                                                            value={comment}
                                                            multiline
                                                            label="Write a comment ..."
                                                            onChange={(e) => {
                                                                setComment(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Button
                                                            onClick={() => {
                                                                handleComment();
                                                            }}
                                                            disabled={
                                                                comment.length ==
                                                                0
                                                            }
                                                        >
                                                            Comment
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <hr />
                                        </>
                                    ) : (
                                        <></>
                                    )}
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
                                                                <b>
                                                                    {
                                                                        commenterName
                                                                    }
                                                                </b>{" "}
                                                                at{" "}
                                                                {new Date(
                                                                    commentDate
                                                                ).toLocaleString()}
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
                                        <>
                                            {" "}
                                            <Typography
                                                variant={"h6"}
                                                textAlign={"left"}
                                                sx={{
                                                    margin: "10px auto",
                                                    padding: "10px",
                                                }}
                                            >
                                                Be the first to comment.
                                            </Typography>
                                        </>
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
