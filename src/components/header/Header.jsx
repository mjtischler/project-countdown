import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Header.css';

export default function ButtonAppBar() {
  return (
        <Box sx={{ flexGrow: 1 }} className="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
                        Project Countdown {/* When using MUI you generally want to leverage their Typography component for text. */}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}