import React, { useState, useEffect } from "react";
import { Paper, Card, Grid, Typography } from "@mui/material";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import axios from "axios";
import Loader from "../../Components/General/Loader";

function Userchat() {
    // get user auth
    // load all chats user have
    // load all messages when user select chat
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const id = useSelector((state) => state.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    const handleSelectChat = async (newChatId) => {
        if (newChatId == selectedChatId) {
            setSelectedChatId(null);
            setSelectedChat(null);
        } else {
            setSelectedChatId(newChatId);
            await getChatMessages(newChatId);
        }
    };

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
                setSelectedChat(result.data);
            })
            .catch((err) => {});
    };

    const loadChats = async (id) => {
        const currentToken = localStorage.getItem("userToken");
        setLoading(true);
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

    useEffect(() => {
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
                            <Card
                                sx={{
                                    minHeight: "80vh",
                                    padding: "10px",
                                    display: "block",
                                }}
                            >
                                {selectedChat ? (
                                    <>
                                        {" "}
                                        <Card
                                            sx={{
                                                width: "100%",
                                                padding: "10px",
                                            }}
                                        >
                                            <Typography
                                                variant={"h5"}
                                                mb={1}
                                                sx={{
                                                    padding: "10px",
                                                }}
                                            >
                                                {selectedChat.otherUser.name}
                                            </Typography>
                                        </Card>
                                        <Card
                                            sx={{
                                                width: "100%",
                                                padding: "10px",
                                                background: "red",
                                            }}
                                        ></Card>
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
                            </Card>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
}

export default Userchat;
