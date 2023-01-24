import React, { useState } from "react";
import { Card, Grid, TextField, Box, Select, MenuItem } from "@mui/material";
import ProjectContainer from "../../Components/Projects/ProjectContainer";
function ProjectListContainer({
    projects,
    isOwner,
    userId,
    handleLike,
    handleDelete,
}) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(0);
    const sortingOrder = ["Select ...", "Name (A-Z)", "Name(Z-A)"];
    return (
        <>
            {/* search as you type & filter*/}
            <Card
                sx={{
                    margin: "10px auto",
                    padding: "10px",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder={"Search ..."}
                            variant={"outlined"}
                            sx={{ width: "100%",margin:"10px auto" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select
                            value={sortBy}
                            onChange={(e)=>{setSortBy(e.target.value)}}
                            sx={{width: "100%",margin:"10px auto",textAlign:"left" }}
                        >
                            {sortingOrder.map((sortingOption, index) => {
                                return (
                                    <MenuItem value={index} key={index}>
                                        {sortingOption}
                                    </MenuItem>
                                );
                            })}
                        </Select>
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
                            {projects
                                .filter((project) => {
                                    return (
                                        project.projectName
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        project.projectDescription
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    );
                                })
                                .sort((a, b) =>
                                    sortBy == 1
                                        ? a.projectName > b.projectName
                                            ? 1
                                            : -1
                                        : sortBy == 2
                                        ? b.projectName > a.projectName
                                            ? 1
                                            : -1
                                        : -1
                                )
                                .map((project, index) => {
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
