import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import "../assets/styles/navbar.css"; // import CSS

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" className="navbar">
            <Toolbar className="toolbar">
                <div className="desktop-menu">
                    <Button color="inherit" component={Link} to="/">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
                    <Button color="inherit" component={Link} to="/purchases">Purchases</Button>
                    <Button color="inherit" component={Link} to="/usage">Usage</Button>
                </div>

                <div className="mobile-menu">
                    <IconButton color="inherit" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/" onClick={handleClose}>Dashboard</MenuItem>
                        <MenuItem component={Link} to="/inventory" onClick={handleClose}>Inventory</MenuItem>
                        <MenuItem component={Link} to="/purchases" onClick={handleClose}>Purchases</MenuItem>
                        <MenuItem component={Link} to="/usage" onClick={handleClose}>Usage</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}
