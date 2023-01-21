import React, { useState, useEffect } from "react";
import {
    Card,
    Typography,
    Paper,
    Button,
    TextField,
    Select,
    MenuItem,
    Grid,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectLinkRow from "./ProjectLinkRow";

function ProjectForm({ submitFunction, title, userId, projectObject }) {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [status, setStatus] = useState(0);
    const fileReader = new FileReader();

    const statuses = [
        "Getting User Feedback",
        "Finding Manpower",
        "Finding Investors",
    ];

    const navigate = useNavigate();
    // Project [Object]:
    // projectId
    // userId
    // projectName
    // projectDescription
    // projectPicture

    // projectLinks [Array]:
    // LinkLabel, LinkURL

        // ================= load current proj if have =================

    const loadCurrentProject = () =>{
        console.log("projectObject",projectObject)
        if(projectObject){
            const {projectName,projectDescription,status,projectImage,projectLinks} = projectObject
            setProjectName(projectName)
            setProjectDescription(projectDescription)
            setStatus(status)
            setProjectLinks(projectLinks)
        }
    }

    // =================when user clicks submit/cancel =================
    const handleSubmit = async () => {
        const errors = [];
        // check if project name is empty or past 30 char
        if (!projectName || projectName.length > 30) {
            errors.push("Project Name cannot be empty!");
        }
        // check if project description is empty or past 300 char
        if (!projectName || projectName.length > 30) {
            errors.push("Project Name cannot be empty!");
        }
        if (status == -1) {
            errors.push("Select a status");
        }
        if (errors.length > 0) {
            alert("Please resolve the problems");
        } else {
            const currProject = {
                userId,
                projectName,
                projectDescription,
                status,
                projectLinks,
                projectPicture,
            };
            await submitFunction(currProject);
        }
    };
    const handleCancel = () => {
        navigate("/projects");
    };

    // =================project picture=================
    const [projectPicture, setProjectPicture] = useState(null);
    const [imagePreviewURL, setImagePreviewURL] = useState("");
    // for file upload & preview
    const handleImageChange = async (event) => {
        if (event.target.files && event.target.files.length == 1) {
            const selectedImage = event.target.files[0];
            converImageToBase64(selectedImage).then((res) => {
                setProjectPicture(res);
            });
            setImagePreviewURL(URL.createObjectURL(selectedImage));
        }
    };

    // to conver the image into base64

    function converImageToBase64(image) {
        return new Promise((resolve, reject) => {
            fileReader.readAsDataURL(image);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    // for removing selected image
    const handleRemoveImage = () => {
        setProjectPicture(null);
        setImagePreviewURL("");
    };
    // when there is an existing image in the project database
    const autoUploadImage = () => {};

    // =================project link management=================
    const [projectLinks, setProjectLinks] = useState([]);
    const [linkName, setLinkName] = useState("");
    const [url, setUrl] = useState("");

    const addProjectLink = () => {
        if (!linkName || !url) {
            alert("Link name or url cannot be empty");
        } else {
            const duplicaateName = projectLinks.filter((projectLink) => {
                return projectLink.linkName == linkName;
            });
            if (duplicaateName.length !== 0) {
                alert("Name used already");
            } else {
                projectLinks.push({ linkName, url });
                setProjectLinks(projectLinks);
                // setProjectLinks([...projectLinks, { linkName, url }]);
                setLinkName("");
                setUrl("");
            }
        }
    };
    const updateProjectLinkChanges = (link, currIndex) => {
        const { linkName, url } = link;
        projectLinks[currIndex].linkName = linkName;
        projectLinks[currIndex].url = url;
    };
    const deleteProjectLink = (currentProject) => {
        const updatedProjectLinks = projectLinks.filter((projectLink) => {
            return !(projectLink == currentProject);
        });
        setProjectLinks([...updatedProjectLinks]);
    };

    useEffect(()=>{
        loadCurrentProject();
    },[])

    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    padding: "10px;",
                    margin: "10px auto;",
                    width: {
                        xs: "90vw",
                        // sm: "80vw",
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
                <Select
                    value={status}
                    variant="outlined"
                    sx={{
                        width: "100%",
                        margin: "10px auto",
                        color: "black",
                        textAlign: "left",
                    }}
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                    label="Status"
                >
                    {statuses.map((value, index) => {
                        return <MenuItem value={index}>{value}</MenuItem>;
                    })}
                </Select>
                {/* </FormControl> */}

                <hr></hr>
                <Grid container>
                    <Grid item xs={12} md={5}>
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
                    </Grid>
                    <Grid item xs={12} md={5}>
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
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                background: "#41B883",
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
                            onClick={() => {
                                addProjectLink();
                            }}
                        >
                            Add Link
                        </Button>
                    </Grid>
                </Grid>
                {/* where you put the links */}
                {projectLinks ? (
                    <>
                        {projectLinks.map((projectLink, index) => (
                            <ProjectLinkRow
                                projectLink={projectLink}
                                key={projectLink.linkName}
                                index={index}
                                handleEdit={updateProjectLinkChanges}
                                handleDelete={deleteProjectLink}
                            />
                        ))}
                    </>
                ) : (
                    <></>
                )}

                <br />
                <hr />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{
                        background: "#41B883",
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
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {projectObject ? <>Save</> : <>Submit</>}
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
                    onClick={() => {
                        handleCancel();
                    }}
                >
                    Cancel
                </Button>
            </Card>
        </div>
    );
}

export default ProjectForm;
