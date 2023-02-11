import React, { useEffect, useState } from "react";
import {
    publicAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import DefaultProjectIcon from "../../Images/defaultproject.png";

import {
    Card,
    Grid,
    Typography,
    Button,
    Box,
    TextField,
    Badge,
} from "@mui/material";
import Loader from "../../Components/General/Loader";
import ShareDialog from "../../Components/Projects/ShareDialog";

// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

// helper function
import { formatDate } from "../../HelperFunctions/dateFormats";
import { current } from "@reduxjs/toolkit";

function IndividualProjectPage() {
    const [loading, setLoading] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = useSelector((state) => state.id);
    const { projectId } = useParams();
    const currentToken = localStorage.getItem("userToken");
    const statuses = [
        "Getting User Feedback",
        "Finding Manpower",
        "Finding Investors",
    ];

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
            await axios
                .put(
                    `${process.env.REACT_APP_API_LINK}/projects/like/${projectId}`,
                    {
                        userId,
                    },
                    { headers: { Authorization: `Bearer ${currentToken}` } }
                )
                .then(async () => {
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
        await axios
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
            .then(async () => {
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
                                <Typography
                                    textAlign={"left"}
                                    sx={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    <Link
                                        to="/projects"
                                        sx={{
                                            textAlign: "left",
                                            margin: "10px",
                                            color: "black",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Back
                                    </Link>
                                </Typography>
                                <Box sx = {{width:"100%"}}>
                                    <img
                                        src={
                                            currentProject.projectPicture.url
                                                ? currentProject.projectPicture
                                                      .url
                                                : DefaultProjectIcon
                                        }
                                        alt={"Add image"}
                                        style={{
                                            width: "100%",
                                            margin: "auto",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        textAlign={"left"}
                                        sx={{
                                            margin: "10px;",
                                        }}
                                    >
                                        Project Name:{" "}
                                        {currentProject.projectName}
                                    </Typography>
                                    <Typography
                                        variant={"h5"}
                                        textAlign={"left"}
                                        sx={{
                                            margin: "10px;",
                                        }}
                                    >
                                        By:{" "}
                                        <a
                                            href={`${process.env.REACT_APP_UI_LINK}user/profile/${currentProject.userId}`}
                                            target={"_blank"}
                                        >
                                            {username}
                                        </a>
                                    </Typography>
                                    <hr />
                                    <Typography
                                        variant="h5"
                                        textAlign={"left"}
                                        sx={{
                                            margin: "10px;",
                                        }}
                                    >
                                        {currentProject.projectDescription}
                                    </Typography>
                                    <hr />
                                    <Typography
                                        variant="h5"
                                        textAlign={"left"}
                                        sx={{
                                            margin: "10px;",
                                        }}
                                    >
                                        Uploaded at :{" "}
                                        {formatDate(currentProject.addedDate)}
                                    </Typography>{" "}
                                    <></>
                                    )}
                                    <Badge
                                        badgeContent={
                                            statuses[currentProject.status]
                                        }
                                        color="primary"
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                width: "max-content",
                                                background: "#0cb268",
                                            },
                                        }}
                                    />
                                    <hr />
                                    {currentProject.projectLinks.length > 0 ? (
                                        <>
                                            {" "}
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
                                                        const {
                                                            linkName,
                                                            url,
                                                        } = projectLink;
                                                        return (
                                                            <li key={index}>
                                                                <a
                                                                    href={url}
                                                                    target={
                                                                        "_blank"
                                                                    }
                                                                >
                                                                    {linkName}
                                                                </a>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <Typography
                                                variant={"h5"}
                                                textAlign={"center"}
                                            >
                                                No links available for this
                                                project.
                                            </Typography>
                                        </>
                                    )}
                                    <hr />
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={4}
                                            sx={{
                                                margin: "auto",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                variant={"filled"}
                                                onClick={async () => {
                                                    await handleLike(
                                                        projectId,
                                                        id
                                                    );
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
                                            xs={4}
                                            sx={{
                                                margin: "auto",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                variant={"filled"}
                                                sx={{
                                                    width: "100%",
                                                }}
                                            >
                                                <a
                                                    href={"#comments"}
                                                    style={{
                                                        color: "black",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {
                                                        currentProject.comments
                                                            .length
                                                    }
                                                    <ChatBubbleOutlineIcon />
                                                </a>
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
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
                                                    setOpenDialog(true);
                                                }}
                                            >
                                                <ShareIcon />
                                            </Button>
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
                                                            onClick={async () => {
                                                                await handleComment();
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
                                    <Box id={"comments"}>
                                        {currentProject.comments.length > 0 ? (
                                            <Box
                                                sx={{
                                                    padding: "10px",
                                                }}
                                            >
                                                {currentProject.comments.map(
                                                    (comment) => {
                                                        const {
                                                            commenterId,
                                                            commenterName,
                                                            commentContent,
                                                            commentDate,
                                                        } = comment;
                                                        return (
                                                            <Card
                                                                style={{
                                                                    margin: "10px auto",
                                                                    padding:
                                                                        "10px",
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant={
                                                                        "h6"
                                                                    }
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
                                                                        "subtitle1"
                                                                    }
                                                                    textAlign={
                                                                        "left"
                                                                    }
                                                                >
                                                                    {
                                                                        commentContent
                                                                    }
                                                                </Typography>
                                                            </Card>
                                                        );
                                                    }
                                                )}
                                            </Box>
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
                                    </Box>
                                </Box>
                            </Card>
                            <ShareDialog
                                handleClose={() => setOpenDialog(false)}
                                isOpen={openDialog}
                                projectId={projectId}
                                projectName={currentProject.projectName}
                            />
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
