import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar, Tooltip} from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import { MainListItems } from './listItems';
import { useAuth } from '../../hooks/auth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 65px)',
    overflow: 'auto',
    marginTop: '65px'
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Admin: React.FC = ({ children }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [titulo, setTitulo] = useState('');
  const { signOut } = useAuth();

  const classes = useStyles();

  useEffect(() => {
    const rota = history.location.pathname.split('/')[1];
    switch (rota) {
      case 'historico':
        setTitulo('Historico');
        break;
      case 'stock':
        setTitulo('Buscar Ação');
        break;
      case 'comparacao':
        setTitulo('Comparacação');
        break;
      case 'historico':
          setTitulo('Historico');
        break;
      case 'projecao':
          setTitulo('Projeção');
        break;



        break;
      default:
        setTitulo('');
    }
  }, [history.location]);

  const handleDrawerOpen = (): any => {
    setOpen(true);
  };
  const handleDrawerClose = (): any => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {titulo}
          </Typography>
          <Tooltip title='Perfil' placement="bottom" arrow>
            <IconButton color="inherit" onClick={() => history.push('/profile')}>
              <Badge badgeContent={0} color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Notificações' placement="bottom" arrow>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Sair' placement="bottom" arrow>
            <IconButton color="inherit" onClick={signOut}>
              <Badge badgeContent={0} color="secondary">
                <ExitToAppIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <ListItem>
            <ListItemText primary="Finances Stock" />
          </ListItem>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{padding: '0px'}}>
          <MainListItems open={open}/>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <div style={{ minHeight: '76vh'}}>{children}</div>
        </Container>
        <Box pt={4}>
        </Box>
      </main>
    </div>
  );
};

export default Admin;
