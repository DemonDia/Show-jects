import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    Snackbar,
} from "@mui/material";

function StartChat({ handleClose, isOpen, sendMessage, userName }) {
    const [message, setMessage] = useState("");
    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
            fullWidth
            maxWidth={"none"}
            sx={{
                margin: "auto",
                width: {
                    sx: "90vw",
                    sm: "70vw",
                    lg: "40vw",
                },
            }}
        >
            <Box sx={{ width: "100%" }}>
                <DialogTitle>Send message</DialogTitle>
                <hr />
                <Typography
                    variant="h6"
                    textAlign={"left"}
                    sx={{ padding: "5px", margin: "10px" }}
                >
                    To: {userName}
                </Typography>
                <TextField
                    sx={{ margin: "10px", width: "90%" }}
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                >
                    <Button sx={{ width: "40%" }}>Back</Button>
                    <Button
                        sx={{ width: "40%" }}
                        onClick={() => {
                            sendMessage(message);
                        }}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}

export default StartChat;
