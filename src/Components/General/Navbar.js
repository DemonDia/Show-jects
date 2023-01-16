import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";

import { useSelector } from "react-redux";


const drawerWidth = 240;
const loggedInPages = ["Home", "Own Projects", "Browse Projects", "Logout"];
const notLoggedInPages = ["Projects", "Register", "Login"];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const username = useSelector((state) => state.username);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                ShowJect
            </Typography>
            <Divider />
            <List>
                {username ? (
                    <>
                        {loggedInPages.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton sx={{ textAlign: "center" }}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </>
                ) : (
                    <>
                        {notLoggedInPages.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton sx={{ textAlign: "center" }}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </>
                )}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                component="nav"
                sx={{ background: "white", color: "black" }}
            >
                <Toolbar>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "flex" },
                        }}
                    >
                        ShowJect
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {username ? (
                            <>
                                {loggedInPages.map((item) => (
                                    <Button key={item} sx={{ color: "black" }}>
                                        {item}
                                    </Button>
                                ))}
                            </>
                        ) : (
                            <>
                                {notLoggedInPages.map((item) => (
                                    <Button key={item} sx={{ color: "black" }}>
                                        {item}
                                    </Button>
                                ))}
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Navbar;
