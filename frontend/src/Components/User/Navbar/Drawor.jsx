import React from 'react';
import { Drawer, List, Divider, IconButton, ListItemText, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = React.useState(false);

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Contact Us', path: '/contact' },
        { text: 'About Us', path: '/about' },
        { text: 'Service', path: '/service' },
        { text: 'Doctors', path: '/doctor' }
    ];

    const authItems = [
        { text: 'User Login', path: '/login' },
        { text: 'Doctor Login', path: '/doctorlogin' },
        { text: 'Sign Up', path: '/signup' }
    ];

    const toggleDrawer = () => setOpen(!open);

    const renderList = (items) => (
        <List>
            {items.map(({ text, path }) => (
                <ListItemButton key={path} component={Link} to={path}>
                    <ListItemText primary={text} />
                </ListItemButton>
            ))}
        </List>
    );

    return (
        <>
            <Drawer open={open} onClose={toggleDrawer}>
                {renderList(menuItems)}
                <Divider />
                {renderList(authItems)}
            </Drawer>

            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default Sidebar;
