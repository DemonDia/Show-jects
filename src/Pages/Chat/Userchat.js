import React, { useState, useEffect, useRef } from "react";
import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import axios from "axios";
import Loader from "../../Components/General/Loader";

import { io } from "socket.io-client";

// io.connect(process.env.REACT_APP_SOCKET_LINK);

function Userchat() {
    // get user auth
    // load all chats user have
    // load all messages when user select chat
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const ref = useRef(null);
    const id = useSelector((state) => state.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedChatId, setSelectedChatId] = useState(null);
    const [otherUser, getOtherUser] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);

    const handleSelectChat = async (newChatId) => {
        if (newChatId == selectedChatId) {
            setSelectedChatId(null);
            getOtherUser(null);
            setChatMessages([]);
        } else {
            setSelectedChatId(newChatId);
            await getChatMessages(newChatId);
        }
    };

    const [message, setMessage] = useState(null);

    const getChatMessages = async (chatId) => {
        const currentToken = localStorage.getItem("userToken");
        await axios
            .get(
                `${process.env.REACT_APP_API_LINK}/chats/c/${chatId}/u/${id}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            )
            .then((result) => {
                console.log(result.data);
                const { otherUser, messages } = result.data;
                setChatMessages(messages);
                getOtherUser(otherUser);
            })
            .catch((err) => {});
    };

    const loadChats = async (id) => {
        const currentToken = localStorage.getItem("userToken");
        await axios
            .get(`${process.env.REACT_APP_API_LINK}/chats/user/${id}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
            })
            .then((result) => {
                setChats(result.data);
                setLoading(false);
            })
            .catch((err) => {});
    };

    const loadPage = async () => {
        setLoading(true);
        await defaultAuthCheck(navigate)
            .then(async (res) => {
                const { name, id } = getCurrentUser(res);
                dispatch(userActions.login({ name, id }));
                await loadChats(id);
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout());
                setLoading(false);
            });
    };

    const handleKeypress = async (e) => {
        if (e.keyCode === 13) {
            if (message) {
                const currentToken = localStorage.getItem("userToken");
                await axios
                    .put(
                        `${process.env.REACT_APP_API_LINK}/chats/message/`,
                        {
                            userId: id,
                            chatId: selectedChatId,
                            message,
                        },
                        { headers: { Authorization: `Bearer ${currentToken}` } }
                    )
                    .then(async () => {
                        setMessage("");
                        await getChatMessages(selectedChatId);
                    });
            }
        }
    };

    // ====================sockets=====================
    const socket = useRef(io(process.env.REACT_APP_SOCKET_LINK));
    useEffect(() => {
        if (id) {
            socket.current.emit("addUser", id);
            socket.current.on("getUsers", (users) => {
                console.log("users", users);
            });
        }
    }, [id]);

    useEffect(() => {
        // console.log(process.env.REACT_APP_SOCKET_LINK);
        loadPage();
    }, []);
    return (
        <div>
            {loading ? (
                <>
                    <Loader message="Loading chats..." />
                </>
            ) : (
                <>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            width: {
                                xs: "100vw",
                                lg: "80vw",
                            },
                            margin: "auto",
                            padding: "20px",
                        }}
                    >
                        <Grid item xs={4} md={3}>
                            <Card sx={{ minHeight: "80vh", padding: "10px" }}>
                                <Typography
                                    variant={"h5"}
                                    mb={1}
                                    sx={{
                                        padding: "10px",
                                    }}
                                >
                                    Chats
                                </Typography>
                                <hr />
                                {chats.map((chat) => {
                                    const { chatId, otherUser } = chat;
                                    const { _id, name } = otherUser;
                                    return (
                                        <Card
                                            key={chatId}
                                            sx={{
                                                margin: "10px auto",
                                                padding: "10px",
                                                "&:hover": {
                                                    cursor: "pointer",
                                                },
                                                transition: " 0.2s ease-in-out",
                                            }}
                                            style={{
                                                background:
                                                    selectedChatId == chatId
                                                        ? "#309F6E"
                                                        : "white",
                                                color:
                                                    selectedChatId == chatId
                                                        ? "white"
                                                        : "black",
                                            }}
                                            onClick={() => {
                                                handleSelectChat(chatId);
                                            }}
                                        >
                                            <Typography
                                                variant={"h6"}
                                                textAlign={"left"}
                                            >
                                                {name}
                                            </Typography>
                                        </Card>
                                    );
                                })}
                            </Card>
                        </Grid>
                        <Grid item xs={8} md={9}>
                            <Box
                                sx={{
                                    height: "80vh",
                                    padding: "10px",
                                    display: "block",
                                }}
                            >
                                {otherUser && selectedChatId ? (
                                    <>
                                        {" "}
                                        <Card
                                            sx={{
                                                height: "10%",
                                                width: "100%",
                                                display: "flex",
                                            }}
                                        >
                                            <Typography
                                                variant={"h5"}
                                                mb={1}
                                                sx={{
                                                    margin: "0 auto",
                                                    alignSelf: "center",
                                                }}
                                            >
                                                {otherUser.name}
                                            </Typography>
                                        </Card>
                                        {/* messages */}
                                        <Card
                                            sx={{
                                                height: "80%",
                                                width: "100%",
                                                // overflow:"hidden",
                                                overflowY: "auto",
                                                // padding: "50px 0"
                                            }}
                                        >
                                            {chatMessages.length == 0 ? (
                                                <>
                                                    <h1>Nothing to see here</h1>
                                                </>
                                            ) : (
                                                <>
                                                    {chatMessages.map(
                                                        (currMessage) => {
                                                            const {
                                                                message,
                                                                userId,
                                                            } = currMessage;
                                                            return (
                                                                <Box
                                                                    sx={{
                                                                        margin: "0 auto",
                                                                        marginTop:
                                                                            "5px",
                                                                        // width: "90%",
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            userId !=
                                                                            id
                                                                                ? "flex-start"
                                                                                : "flex-end",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant={
                                                                            "subtitle1"
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                "block",
                                                                            wordWrap:
                                                                                "break-word",
                                                                            maxWidth:
                                                                                "60%",
                                                                            marginLeft:
                                                                                userId !=
                                                                                id
                                                                                    ? "20px"
                                                                                    : "40px",
                                                                            marginRight:
                                                                                userId !=
                                                                                id
                                                                                    ? "40px"
                                                                                    : "20px",
                                                                            borderRadius:
                                                                                userId !=
                                                                                id
                                                                                    ? "12px 12px 12px 0"
                                                                                    : "12px 12px 0 12px",
                                                                            color:
                                                                                userId !=
                                                                                id
                                                                                    ? "black"
                                                                                    : "white",
                                                                            background:
                                                                                userId !=
                                                                                id
                                                                                    ? "#f1eeee"
                                                                                    : "#309f6e",
                                                                            padding:
                                                                                "10px",
                                                                            textAlign:
                                                                                userId !=
                                                                                id
                                                                                    ? "left"
                                                                                    : "right",
                                                                        }}
                                                                    >
                                                                        {
                                                                            message
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            );
                                                        }
                                                    )}{" "}
                                                </>
                                            )}
                                            <div ref={ref} />
                                        </Card>
                                        <Card
                                            sx={{
                                                width: "100%",
                                                height: "10%",
                                                display: "flex",
                                                alignItems: "center",
                                                // padding: "10px",
                                            }}
                                        >
                                            <TextField
                                                sx={{
                                                    width: "100%",
                                                    padding: "10px",
                                                    margin: "0 auto",
                                                }}
                                                onKeyDown={(e) => {
                                                    handleKeypress(e);
                                                }}
                                                placeholder="Say something ..."
                                                value={message}
                                                onChange={(e) => {
                                                    setMessage(e.target.value);
                                                }}
                                            />
                                        </Card>
                                    </>
                                ) : (
                                    <Card
                                        className="empty-chat"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            padding: "10px",
                                            margin: "auto",
                                        }}
                                    >
                                        <Typography
                                            variant={"h4"}
                                            textAlign={"center"}
                                        >
                                            Select a chat
                                        </Typography>
                                    </Card>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
}

export default Userchat;
