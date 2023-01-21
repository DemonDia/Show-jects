import React, { useState } from "react";
import { Grid, TextField, Typography, Button, Card, Box } from "@mui/material";

function ProjectLinkRow({ projectLink, handleEdit, handleDelete ,index}) {
    const saveChanges = () => {
        if (!linkName || !url) {
            alert("Link name or url cannot be empty");
        } else {
            const updatedLink = {
                linkName,
                url
            }
            handleEdit(updatedLink, index);
            setIsEditing(false);
            // cancelChanges();
        }
    };
    const cancelChanges = () => {
        const { linkName, url } = projectLink;
        setLinkName(linkName);
        setUrl(url);
        setIsEditing(false);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [linkName, setLinkName] = useState(projectLink.linkName);
    const [url, setUrl] = useState(projectLink.url);

    return (
        <Card
            sx={{
                margin: "10px auto",
                padding: "10px",
            }}
        >
            <Grid container>
                <Grid item xs={12} md={5}>
                    {!isEditing ? (
                        <Typography textAlign={"left"}>{linkName}</Typography>
                    ) : (
                        <TextField
                            label="Link Name (Max 30 characters)*"
                            variant="outlined"
                            sx={{
                                width: "100%",
                                margin: "10px auto",
                            }}
                            value={linkName}
                            onChange={(e) => {
                                setLinkName(e.target.value);
                            }}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={5}>
                    {!isEditing ? (
                        <Typography textAlign={"left"}>{url}</Typography>
                    ) : (
                        <TextField
                            label="Link URL*"
                            variant="outlined"
                            sx={{
                                width: "100%",
                                margin: "10px auto",
                            }}
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                            }}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={2}>
                    {!isEditing ? (
                        <>
                            <Button
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => {
                                    handleDelete(projectLink);
                                }}
                            >
                                Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    saveChanges();
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    cancelChanges();
                                }}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
}

export default ProjectLinkRow;
