import React, { useState } from "react";
import { Card, Grid, TextField, Box } from "@mui/material";
import ProjectContainer from "../../Components/Projects/ProjectContainer";
function ProjectListContainer({
    projects,
    isOwner,
    userId,
    handleLike,
    handleDelete,
}) {
    const [search, setSearch] = useState("");
    return (
        <>
            {/* search as you type & filter*/}
            <Card
                sx={{
                    margin: "10px auto",
                    padding: "10px",
                }}
            >
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            value={search}
                            placeholder={"Search ..."}
                            variant={"outlined"}
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>
            </Card>
            {/*  */}
            <Box
                sx={{
                    margin: "10px auto",
                    padding: "10px",
                }}
            >
                <Grid container>
                    {projects != null ? (
                        <>
                            {projects.map((project, index) => {
                                return (
                                    <ProjectContainer
                                        key={index}
                                        project={project}
                                        isOwner={isOwner}
                                        userId={userId}
                                        handleLike={handleLike}
                                        handleDelete={handleDelete}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Box>
        </>
    );
}

export default ProjectListContainer;
