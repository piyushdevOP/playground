import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { GitHub } from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, Container } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import { Components_Index } from "../Navigation";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: "1.5rem",
    minHeight: "100vh",
  },

  sideListItem: {
    transition: "0.1s all ease-in",
    "&:hover": {
      borderRight: "5px solid #2089dc",
    },
    "&:focus": {
      borderRight: "5px solid #2089dc",
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleDrawerToggle = (value) => {
    if (value === false) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <div style={{ padding: "0.5rem" }}>
        <Link to="/" onClick={() => handleDrawerToggle(false)}>
          <Typography variant="h5">
            Playground{" "}
            <span role="img" aria-label="playground">
              🚀
            </span>
          </Typography>
        </Link>
      </div>
      <List>
        {Components_Index.map((elm, index) => (
          <Link
            key={elm.name}
            to={elm.path}
            onClick={() => handleDrawerToggle(false)}
          >
            <ListItem
              button
              key={elm.name}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              className={classes.sideListItem}
            >
              <ListItemText primary={elm.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Link to="/">
            <Typography
              variant="h4"
              noWrap
              //  style={{ fontStyle: "bold",'font-family': "Aerial"}}
              style={{
                marginLeft: "auto",
                fontSize: "calc(1rem + 6 * ((100vw - 320px) / 680))",
                fontStyle: "Bold",
                marginLeft: "auto",
              }}
            >
              React Native Elements
            </Typography>
          </Link>

          <div
            style={{
              marginLeft: "auto",
              fontSize: "calc(1rem + 6 * ((100vw - 320px) / 680))",
            }}
          >
            <a
              href="https://reactnativeelements.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="inherit">Docs</Button>
            </a>
            <IconButton
              color="inherit"
              rel="noopener noreferrer"
              href="https://github.com/react-native-elements/react-native-elements"
              target="_blank"
            >
              <GitHub />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={() => handleDrawerToggle(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          <Navigation />
        </Container>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
