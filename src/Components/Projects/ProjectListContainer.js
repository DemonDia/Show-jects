import React, { useState } from "react";
import {
    Card,
    Grid,
    TextField,
    Box,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import ProjectContainer from "../../Components/Projects/ProjectContainer";
import Loader from "../General/Loader";
import { useLocation } from "react-router-dom";
function ProjectListContainer({
    projects,
    isOwner,
    userId,
    handleLike,
    handleDelete,
}) {
    const { pathname } = useLocation();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(0);
    const sortingOrder = ["Select ...", "Name (A-Z)", "Name(Z-A)"];
    console.log("pathname", pathname);
    return (
        <>
            {/* search as you type & filter*/}
            <Card
                sx={{
                    margin: "10px auto",
                    padding: "10px",
                }}
            >
                <>
                    {!pathname.includes("/user/profile/") ? (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        placeholder={"Search ..."}
                                        variant={"outlined"}
                                        sx={{
                                            width: "100%",
                                            margin: "10px auto",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Select
                                        value={sortBy}
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                        }}
                                        sx={{
                                            width: "100%",
                                            margin: "10px auto",
                                            textAlign: "left",
                                        }}
                                    >
                                        {sortingOrder.map(
                                            (sortingOption, index) => {
                                                return (
                                                    <MenuItem
                                                        value={index}
                                                        key={index}
                                                    >
                                                        {sortingOption}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <></>
                    )}
                </>
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
                            {projects.length > 0 ? (
                                <>
                                    {" "}
                                    {projects
                                        .filter((project) => {
                                            return (
                                                project.projectName
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    ) ||
                                                project.projectDescription
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )
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
                                <>
                                    <Typography
                                        variant="h5"
                                        sx={{ margin: "auto",padding:"20px" }}
                                        // textAlign
                                    >
                                        No projects to show ..
                                    </Typography>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Loader />{" "}
                        </>
                    )}
                </Grid>
            </Box>
        </>
    );
}

export default ProjectListContainer;
