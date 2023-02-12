import React, { useState } from "react";
import {
    Card,
    Grid,
    Typography,
    Button,
    Badge,
    LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShareDialog from "./ShareDialog";

// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";

// helper function
import { formatDate } from "../../HelperFunctions/dateFormats";
import ProjectIcon from "../../Images/defaultproject.png";
import ProfilePic from "../../Images/personIcon.png";

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
        projectPicture,
        likes,
        comments,
        status,
        addedDate,
        userId: ownerId,
        username,
    } = project;
    const userProfileUrl = `${process.env.REACT_APP_UI_LINK}user/profile/${ownerId}`;
    const [openDialog, setOpenDialog] = useState(false);
    const statuses = [
        "Getting User Feedback",
        "Finding Manpower",
        "Finding Investors",
    ];

    const [isLiking, setIsLiking] = useState(false);
    const [message, setMessage] = useState("");
    const likeProject = async (projectId, userId) => {
        setIsLiking(true);
        if (!likes.includes(userId)) {
            setMessage("Liking ...");
        } else {
            setMessage("Un-liking ...");
        }
        await handleLike(projectId, userId)
            .then(() => {
                setIsLiking(false);
                if (!likes.includes(userId)) {
                    setMessage("Liked!");
                } else {
                    setMessage("Un-liked!");
                }
                messageVanish();
            })
            .catch(() => {
                setIsLiking(false);
                if (likes.includes(userId)) {
                    setMessage("Like failed!");
                } else {
                    setMessage("Unlike failed!");
                }
                messageVanish();
            });
    };

    const messageVanish = () => {
        const timer = setTimeout(() => {
            setMessage("");
        }, 2000);
        return () => clearTimeout(timer);
    };

    return (
        <>
            <Grid item xs={6} md={4} lg={3}>
                <Card sx={{ margin: "10px", padding: "10px" }}>
                    {isOwner ? (
                        <></>
                    ) : (
                        <>
                            <Typography
                                variant={"h5"}
                                textAlign={"left"}
                                sx={{ display: "flex" }}
                            >
                                <a
                                    href={userProfileUrl}
                                    target={"_blank"}
                                    style={{
                                        display: "flex",
                                        alignItems: "end",
                                        gap: "10px",
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    <img
                                        src={ProfilePic}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            margin: "5px auto",
                                        }}
                                    />
                                    {username}
                                </a>
                            </Typography>
                        </>
                    )}
                    <Typography variant={"subtitle2"} textAlign={"left"}>
                        {formatDate(addedDate)}
                    </Typography>
                    <hr />
                    <img
                        object-fit="cover"
                        className={"projectImageContainer"}
                        src={
                            projectPicture.url
                                ? projectPicture.url
                                : ProjectIcon
                        }
                        style={{
                            maxWidth: "100%",
                        }}
                    />
                    <Typography variant={"h5"} textAlign={"left"}>
                        {projectName}
                    </Typography>

                    <Badge
                        badgeContent={statuses[status]}
                        color="primary"
                        sx={{
                            "& .MuiBadge-badge": {
                                width: "max-content",
                                padding: "10px",
                                background: "#0cb268",
                            },
                        }}
                    />
                    <hr />
                    {!userId ? (
                        <>
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
                                    {likes.length} <FavoriteBorderIcon />
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
                                    {comments.length} <ChatBubbleOutlineIcon />
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
                        </>
                    ) : (
                        <>
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
                                        onClick={() => {
                                            likeProject(_id, userId);
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
                                    xs={4}
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
                        </>
                    )}

                    {/* handle */}
                    {/* {message ? <>{isLiking ? <></> : <></>}</> : <></>} */}
                    {message ? (
                        <>
                            {message}
                            {isLiking ? (
                                <>
                                    <LinearProgress color="success" />
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}

                    {/* edit/delete */}
                    {isOwner ? (
                        <>
                            <hr />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        variant={"filled"}
                                        sx={{
                                            padding: "5px",
                                            width: "100%",
                                        }}
                                    >
                                        <Link
                                            to={`/projects/edit/${_id}`}
                                            style={{
                                                color: "black",
                                                textDecoration: "none",
                                                padding: "0",
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
                                            color: "black",
                                            padding: "5px",
                                            width: "100%",
                                        }}
                                        onClick={() => {
                                            handleDelete(_id);
                                        }}
                                    >
                                        <Link
                                            style={{
                                                color: "black",
                                                textDecoration: "none",
                                                padding: "0",
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </Link>
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
                                target={"_blank"}
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
            <ShareDialog
                handleClose={() => setOpenDialog(false)}
                isOpen={openDialog}
                projectId={_id}
                projectName={projectName}
            />
        </>
    );
}

export default ProjectContainer;
