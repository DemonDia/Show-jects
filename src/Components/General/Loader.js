import React from "react";
import { Card, Typography, CircularProgress } from "@mui/material";
function Loader({ message = "Loading, please wait ..." }) {
    return (
        <Card
            sx={{
                width: {
                    xs: "80%",
                    sm: "60%",
                },
                padding: "20px",
                margin: "10px auto",
            }}
        >
            <Typography
                variant="h4"
                textAlign={"center"}
                sx={{
                    margin: "10px auto",
                }}
            >
                {message}
            </Typography>
            <CircularProgress
                size={"100px"}
                thickness={5}
                sx={{
                    margin: "10px auto",
                    color: "#309F6E",
                }}
            />
        </Card>
    );
}

export default Loader;
