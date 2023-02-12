import React, { useState, useEffect } from "react";
import { Paper, Card, Grid, Typography } from "@mui/material";

import Loader from "../../Components/General/Loader";

function Userchat() {
    // get user auth
    // load all chats user have
    // load all messages when user select chat
    const chats = [
        {
            chatId: 1,
            users: [1, 2],
        },
        {
            chatId: 2,
            users: [1, 3],
        },
        {
            chatId: 3,
            users: [1, 4],
        },
        {
            chatId: 4,
            users: [1, 5],
        },
        {
            chatId: 5,
            users: [1, 6],
        },
        {
            chatId: 6,
            users: [1, 7],
        },
        {
            chatId: 7,
            users: [1, 8],
        },
        {
            chatId: 8,
            users: [1, 9],
        },
        {
            chatId: 9,
            users: [1, 10],
        },
    ];
    const currUserId = 1;
    const [selectedChatId, setSelectedChatId] = useState(-1);
    const [selectedUserId, setSelectedUserId] = useState(-1);
    const handleSelectChat = (newChatId, newUserId) => {
        if (newChatId == selectedChatId) {
            setSelectedChatId(-1);
            setSelectedUserId(-1);
        } else {
            setSelectedChatId(newChatId);
            setSelectedUserId(newUserId);
        }
    };

    return (
        <div>
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
                            const { chatId, users } = chat;
                            const otherUserId = users.filter((userId) => {
                                return userId != currUserId;
                            });
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
                                        handleSelectChat(chatId, otherUserId);
                                    }}
                                >
                                    <Typography
                                        variant={"h6"}
                                        textAlign={"left"}
                                    >
                                        User {otherUserId}
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
                        {selectedUserId != -1 ? (
                            <>
                                {" "}
                                <Card sx={{ width: "100%", padding: "10px" }}>
                                    <Typography
                                        variant={"h5"}
                                        mb={1}
                                        sx={{
                                            padding: "10px",
                                        }}
                                    >
                                        Chat user {selectedUserId}
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
                                <Typography variant={"h4"} textAlign={"center"}>
                                    Select a chat
                                </Typography>
                            </Card>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Userchat;
