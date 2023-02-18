import React, { useEffect, useState } from "react";
import {
    publicAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import axios from "axios";
import ProjectListContainer from "../../Components/Projects/ProjectListContainer";
import Loader from "../../Components/General/Loader";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import personIcon from "../../Images/personIcon.png";
import StartChat from "../../Components/Chat/StartChat";

function UserProfile() {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setHaveError] = useState(false);
    const id = useSelector((state) => state.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // User profile
    const [user, setUser] = useState(null);
    const profilePromise = axios.get(
        `${process.env.REACT_APP_API_LINK}/users/${userId}`
    );

    // User's posts
    const [projects, setProjects] = useState([]);

    const projectPromise = axios.get(
        `${process.env.REACT_APP_API_LINK}/projects/user/${userId}`
    );

    // message user
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };

    const sendMessage = async (message) => {
        if (!message) {
            alert("Message cannot be empty");
            setModalOpen(false);
        } else {
            const currentToken = localStorage.getItem("userToken");
            const findChatPromise = axios.get(
                `${process.env.REACT_APP_API_LINK}/chats/u1/${id}/u2/${user._id}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            const createChatPromise = axios.post(
                `${process.env.REACT_APP_API_LINK}/chats/`,
                { userIds: [id, user._id] },
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                }
            );
            Promise.allSettled([findChatPromise, createChatPromise]).then(
                async (promiseResults) => {
                    let chatId;
                    const [findChatPromiseResult, createChatPromiseResult] =
                        promiseResults;
                    if (findChatPromiseResult.status == "fulfilled") {
                        console.log("chat found")
                        chatId = findChatPromiseResult.value.data._id;
                    } else {
                        console.log("chat created")
                        chatId = createChatPromiseResult.value.data.chatId;
                    }
                    await axios
                        .put(
                            `${process.env.REACT_APP_API_LINK}/chats/message`,
                            {
                                userId: id,
                                chatId,
                                message,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${currentToken}`,
                                },
                            }
                        )
                        .then(() => {
                            alert("Message Sent");
                            setModalOpen(false);
                        })
                        .catch((err) => {
                            alert("Message failed to send!");
                            setModalOpen(false);
                        });
                }
            );
            // await axios
            //     .get(
            //         `${process.env.REACT_APP_API_LINK}/chats/u1/${id}/u2/${user._id}`,
            //         {
            //             headers: { Authorization: `Bearer ${currentToken}` },
            //         }
            //     )
            //     .then(async (result) => {
            //         // console.log(result.data);
            //         let chatId = null;
            //         console.log(chatId);
            //         if (!result.data) {
            //             // create new chat
            //             const newChatPromise = await axios.post(
            //                 `${process.env.REACT_APP_API_LINK}/chats/`,
            //                 { userIds: [id, user._id] },
            //                 {
            //                     headers: {
            //                         Authorization: `Bearer ${currentToken}`,
            //                     },
            //                 }
            //             );
            //             Promise.all([newChatPromise]).then((res) => {
            //                 const newChatResult = res[0].value;
            //                 chatId = newChatResult.chatId;
            //             });
            //         } else {
            //             chatId = result.data._id;
            //         }
            //         await axios
            //             .put(
            //                 `${process.env.REACT_APP_API_LINK}/chats/message`,
            //                 {
            //                     userId: id,
            //                     chatId,
            //                     message,
            //                 },
            //                 {
            //                     headers: {
            //                         Authorization: `Bearer ${currentToken}`,
            //                     },
            //                 }
            //             )
            //             .then(() => {
            //                 alert("Message Sent");
            //                 setModalOpen(false);
            //             })
            //             .catch((err) => {
            //                 alert("Message failed to send!");
            //                 setModalOpen(false);
            //             });
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //         alert("Message failed to send!");
            //         setModalOpen(false);
            //     });
        }
    };

    // load page
    const loadPage = async () => {
        await publicAuthCheck(navigate)
            .then(async (res) => {
                const { name, id } = getCurrentUser(res);
                dispatch(userActions.login({ name, id }));
            })
            .catch(() => {
                dispatch(userActions.logout());
                setLoading(false);
            });
        Promise.allSettled([profilePromise, projectPromise]).then((res) => {
            console.log(res);
            const [profileResult, projectResults] = res;
            setUser(profileResult.value.data.user);
            setProjects(projectResults.value.data.data);
        });
        setLoading(false);
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            {loading ? (
                <>
                    <Loader message={"Loading profile..."}></Loader>
                </>
            ) : (
                <>
                    {/* user profile */}
                    {user ? (
                        <>
                            {" "}
                            <Card
                                sx={{
                                    width: {
                                        xs: "100vw",
                                        sm: "90vw",
                                        md: "80vw",
                                        lg: "70vw",
                                    },
                                    margin: "auto",
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={4} sx={{ padding: "20px" }}>
                                        <Box
                                            sx={{
                                                width: "200px",
                                                height: "200px",
                                                maxWidth: "100px",
                                                maxHeight: "100px",
                                                borderRadius: "50%",
                                                backgroundImage: `url(${personIcon})`,
                                                backgroundSize: "100%",
                                                margin: "auto",
                                            }}
                                        ></Box>
                                    </Grid>
                                    <Grid item xs={4} sx={{ padding: "20px" }}>
                                        {" "}
                                        <Typography
                                            textAlign={"left"}
                                            variant={"h4"}
                                        >
                                            {user.name}
                                        </Typography>
                                        <Typography
                                            textAlign={"left"}
                                            variant={"h5"}
                                        >
                                            {projects.length} Projects
                                        </Typography>
                                        <Typography textAlign={"left"}>
                                            <a
                                                href={`mailto:${user.email}`}
                                                target={"_blank"}
                                            >
                                                {user.email}
                                            </a>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ padding: "20px" }}>
                                        {id != user._id ? (
                                            <>
                                                {" "}
                                                <Button
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    Chat
                                                </Button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </Grid>
                                </Grid>
                            </Card>
                            <StartChat
                                handleClose={closeModal}
                                isOpen={modalOpen}
                                sendMessage={sendMessage}
                                userName={user.name}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                    <hr />
                    <ProjectListContainer projects={projects} isOwner={false} />

                    {/* user projects (sort from latest) */}
                </>
            )}
        </div>
    );
}

export default UserProfile;
