import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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

const names = {
    12: {
        
        name: 'Oliver Hansen'
    },
    16: {
        
        name: 'Carlos Abbott'
    },
    132: {
        
        name: 'April Tucker'
    },
    512: {
        
        name: 'Virginia Andrews'
    }
};

const priorityList = {
    low: 'Niski',
    medium: 'Normalny',
    hot: 'Wysoki'
}

class CreateTask extends React.Component {
   
    state = {
        assigned: '',
        theme: '',
        content: '',
        priority: '',
        names: {}
    }


    handleChange = name => event => {
            this.setState({
            [name]: event.target.value,
        });
    };

    sendTask = () => {
        const itemsRef = firebase.database().ref('tasks');
        const item = {
            assigned: { ...this.state.names[this.state.assigned], id: this.state.assigned},
            theme: this.state.theme,
            content: this.state.content,
            priority: this.state.priority,
            status: 'todo'
        }
        itemsRef.push(item);
        this.setState({
            assigned: '',
            theme: '',
            content: '',
            priority: ''
        });
    }

    componentDidMount() {
        const ref = firebase.database().ref('users');
        ref.on('value', (snapshot) => {
            this.setState({names: snapshot.val()});
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={24} alignItems="center">
                                <Grid item lg={2} md={2} sm={4} xs={12}>
                                    <Typography className={classes.label}>
                                        Nazwa zadania
                                </Typography>
                                </Grid>
                                <Grid item lg={8} md={10} sm={8} xs={12}>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Tytuł"
                                        placeholder="Wpisz tytuł"
                                        margin="none"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.theme}
                                        onChange={this.handleChange('theme')}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={24} alignItems="center">
                                <Grid item lg={2} md={2} sm={4} xs={12}>
                                    <Typography className={classes.label}>
                                        Treść
                                </Typography>
                                </Grid>
                                <Grid item lg={8} md={10} sm={8} xs={12}>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Twoja treść zadania"
                                        placeholder="Wpisz treść"
                                        margin="none"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows="4"
                                        value={this.state.content}
                                        onChange={this.handleChange('content')}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={24} alignItems="center">
                                <Grid item lg={2} md={2} sm={4} xs={12}>
                                    <Typography className={classes.label}>
                                        Przypisane do
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} md={10} sm={8} xs={12}>
                                    <Select
                                        value={this.state.assigned}
                                        onChange={this.handleChange('assigned')}
                                        variant="outlined"
                                        input={
                                            <OutlinedInput
                                                id="component-outlined"
                                                fullWidth
                                                labelWidth={0}
                                            />
                                        }
                                    >
                                        {Object.keys(this.state.names).map(id => (
                                            <MenuItem key={id} value={id}>
                                                {this.state.names[id].name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container spacing={24} alignItems="center">
                                <Grid item lg={2} md={2} sm={4} xs={12}>
                                    <Typography className={classes.label}>
                                        Priorytet
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} md={10} sm={8} xs={12}>
                                    <Select
                                        value={this.state.priority}
                                        onChange={this.handleChange('priority')}
                                        variant="outlined"
                                        input={
                                            <OutlinedInput
                                                id="component-outlined"
                                                fullWidth
                                                labelWidth={0}
                                            />
                                        }
                                    >
                                        {Object.keys(priorityList).map(name => (
                                            <MenuItem key={name} value={name}>
                                                {priorityList[name]}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                        onClick={this.sendTask}
                                    >
                                        <Icon className={classes.leftIcon}>add</Icon>
                                        Dodaj zadanie
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

CreateTask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreateTask);