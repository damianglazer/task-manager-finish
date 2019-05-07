import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import firebase from '../../firebase';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 24
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    label: {
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: 0,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

class JoinToProject extends Component {

    state = {
        name: '',
        user_id: ''
    }

    componentDidMount() {
        const user_id = window.localStorage.getItem('user_id');
        this.setState({ user_id });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    join = () => {
        let refs = firebase.database().ref('users');
        let key = refs.push({ name: this.state.name }).key;
        window.localStorage.setItem('user_id', key);
    }

    render() {
        const { classes } = this.props;
        if (this.state.user_id) {
            return (
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography>
                                Dołączyłeś już do aplikacji
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )
        }
        
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={24} alignItems="center">
                            <Grid item lg={2} md={2} sm={4} xs={12}>
                                <Typography className={classes.label}>
                                    Imię i nazwisko
                                </Typography>
                            </Grid>
                            <Grid item lg={8} md={10} sm={8} xs={12}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Podaj swoje dane"
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24} alignItems="center">
                            <Grid item lg={2} md={2} sm={4} xs={12}>

                            </Grid>
                            <Grid item lg={8} md={10} sm={8} xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.join}
                                >
                                    <Icon className={classes.leftIcon}>folder_shared</Icon>
                                    Dołącz
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

JoinToProject.propTypes = {

};

export default withStyles(styles, { withTheme: true })(JoinToProject);