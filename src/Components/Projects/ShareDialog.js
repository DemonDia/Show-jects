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
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
function ShareDialog({ handleClose, isOpen, projectId, projectName }) {
    // console.log(`${process.env.REACT_APP_UI_LINK}projects/${projectId}`)
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const projectLink = `${process.env.REACT_APP_UI_LINK}projects/${projectId}`;
    const titleText = `Hello, check out this project: ${projectName}`;
    const handleCopy = () => {
        navigator.clipboard.writeText(projectLink);
        setOpenSnackBar(true);
    };
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
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <DialogTitle>Share with..</DialogTitle>
                <hr />
                <Typography
                    variant="h6"
                    textAlign={"left"}
                    sx={{ padding: "5px", margin: "10px" }}
                >
                    Share via:
                </Typography>
                <Box sx={{ padding: "5px", margin: "10px" }}>
                    <FacebookShareButton url={projectLink} quote={titleText}>
                        <FacebookIcon round={true} />
                    </FacebookShareButton>
                    <LinkedinShareButton url={projectLink} title={titleText}>
                        <LinkedinIcon round={true}/>
                    </LinkedinShareButton>
                    <TwitterShareButton url={projectLink} title={titleText}>
                        <TwitterIcon round={true} />
                    </TwitterShareButton>
                </Box>

                <hr />
                <Typography
                    variant="h6"
                    textAlign={"left"}
                    sx={{ padding: "5px", margin: "10px" }}
                >
                    Or Copy Link:
                </Typography>
                <Box sx={{ padding: "5px", margin: "10px" }}>
                    <TextField
                        value={projectLink}
                        disabled
                        sx={{
                            margin: "auto",
                            width: "100%",
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LinkIcon />
                                </InputAdornment>
                            ),

                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant={"filled"}
                                        onClick={() => {
                                            handleCopy();
                                        }}
                                    >
                                        <ContentCopyIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={1500}
                onClose={() => {
                    setOpenSnackBar(false);
                }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                message="Copied to clipboard!"
            />
        </Dialog>
    );
}

export default ShareDialog;
