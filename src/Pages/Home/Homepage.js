import React, { useEffect, useState } from "react";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import OptionItem from "../../Components/Homepage/OptionItem";

function Homepage() {
    const [loading, setLoading] = useState(false);
    const name = useSelector((state) => state.username);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuOptions = [
        {
            label: "Browse Projects",
            to: "/projects",
        },
        {
            label: "Add Project",
            to: "/projects/add",
        },
        {
            label: "Manage Projects",
            to: "/user/projects",
        },
        {
            label: "View Profile",
            to: "/user/profile",
        },
        {
            label: "Logout",
            to: "/logout",
        },
    ];

    const loadPage = async () => {
        setLoading(true);
        await defaultAuthCheck(navigate)
            .then((res) => {
                const {name,id} = getCurrentUser(res);
                dispatch(userActions.login({name,id}));
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout());
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    padding: "10px;",
                    margin: "10px;",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        padding: "10px;",
                        margin: "10px;",
                    }}
                >
                    Hello {name}, what would you like to do today?
                </Typography>
            </Card>
            {/* menu options */}
            {/* <h1>Homepage</h1> */}
            <Grid
                container
                spacing={2}
                sx={{
                    padding: "10px;",
                    // margin: "10px;",
                }}
            >
                {menuOptions.map((option) => {
                    return (
                        <Grid item xs={12} sm={4} lg={3}>
                            <OptionItem option={option} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default Homepage;
