import React from "react";
import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function OptionItem({ option }) {
    const { label, to } = option;
    return (
        <Link
            to={to}
            style={{
                textDecoration: "none",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#15B26C",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                    }}
                >
                    {label}
                </Typography>
            </Card>
        </Link>
    );
}

export default OptionItem;
