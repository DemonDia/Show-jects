import React, { useState } from "react";
import {
    Card,
    Typography,
    Paper,
    Button,
    TextField,
    TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProjectLinkRow from "./ProjectLinkRow";

function ProjectForm({ submitFunction, title, projectObject }) {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const navigate = useNavigate();
    // Project [Object]:
    // projectId
    // userId
    // projectName
    // projectDescription
    // projectPicture

    // projectLinks [Array]:
    // LinkLabel, LinkURL

    // =================when user clicks "submit"=================
    const handleSubmit = async () => {
        // check if project name is empty or past 30 char
        // check if project description is empty or past 300 char

        await submitFunction();
    };

    // =================project picture=================
    const [projectPicture, setProjectPicture] = useState(null);
    const [imagePreviewURL, setImagePreviewURL] = useState("");
    // for file upload & preview
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length == 1) {
            const selectedImage = event.target.files[0];
            setProjectPicture(selectedImage);
            setImagePreviewURL(URL.createObjectURL(selectedImage));
        }
    };
    // for removing selected image
    const handleRemoveImage = () => {
        setProjectPicture(null);
        setImagePreviewURL("");
    };
    // when there is an existing image in the project database
    const autoUploadImage = () => {};

    // =================project link management=================
    const [projectLinks, setProjectLinks] = useState("");
    const [linkName,setLinkName] = useState("");
    const [url,setUrl] = useState("")

    const addProjectLink = () => {};
    const updateProjectLinkChanges = () => {};
    const deleteProjectLink = () => {};

    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    padding: "10px;",
                    margin: "10px auto;",
                    width: {
                        xs: "90vw",
                        sm: "80vw",
                        md: "70vw",
                        lg: "40vw",
                    },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        padding: "10px;",
                        margin: "10px;",
                    }}
                >
                    {title}
                </Typography>
                <Paper variant="outlined">
                    <img
                        src={imagePreviewURL}
                        alt={"Add image"}
                        style={{
                            width: "100%",
                            margin: "auto",
                        }}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{
                            background: "#41B883",
                            width: "100%",
                            margin: "10px auto",
                            padding: "10px",
                            color: "white",
                            "&:hover": {
                                color: "black",
                            },
                        }}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(e) => {
                                handleImageChange(e);
                            }}
                            accept="image/png, image/gif, image/jpeg"
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{
                            background: "#34495E",
                            width: "100%",
                            margin: "10px auto",
                            padding: "10px",
                            color: "white",
                            "&.Mui-disabled": {
                                color: "white",
                                background: "grey",
                            },
                            "&:hover": {
                                color: "black",
                            },
                        }}
                        disabled={
                            imagePreviewURL && projectPicture ? false : true
                        }
                        onClick={() => {
                            handleRemoveImage();
                        }}
                    >
                        Remove Image
                    </Button>
                </Paper>
                <TextField
                    label="Project Name (Max 30 characters)"
                    variant="outlined"
                    sx={{
                        width: "100%",
                        margin: "10px auto",
                    }}
                    value={projectName}
                    onChange={(e) => {
                        setProjectName(e.target.value);
                    }}
                />
                <TextField
                    label="Project Description (Max 300 characters)*"
                    variant="outlined"
                    multiline
                    sx={{
                        width: "100%",
                        margin: "10px auto",
                    }}
                    value={projectDescription}
                    onChange={(e) => {
                        setProjectDescription(e.target.value);
                    }}
                />
                <hr></hr>
                <TextField
                    label="Link Name (Max 30 characters)"
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
                                <TextField
                    label="Link URL"
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
            </Card>
        </div>
    );
}

export default ProjectForm;
