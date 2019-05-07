import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import firebase from '../../firebase';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
        opacity: 0.5
    },
    titleTask: {
        position: 'absolute',
        color: '#FFF',
        width: '100%',
        textAlign: 'center',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        maxHeight: 140
    },
    mediaContainer: {
        position: 'relative',
        background: '#000',
        overflow: 'hidden'
    },
    hot: {
        background: '#f00'
    },
    medium: {
        background: '#009a0d'
    },
    low: {
        background: '#0058ff'
    },
    contentTask: {
        height: 60,
        overflow: 'hidden',
        overflowY: 'auto'
    }

};

function Task(props) {
    const { classes } = props;
    const logged_user = window.localStorage.getItem('user_id');
    const finished = () => {
        firebase.database().ref().child(`/tasks/${props.task.id}`).update({
            status: 'finished'
        });
    }
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <div className={`${classes.mediaContainer} ${classes[props.task.priority]}`}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.titleTask}>
                        {props.task.theme}
                    </Typography>
                    <CardMedia
                        className={classes.media}
                        image="/images/bg-task.jpg"
                        title="Contemplative Reptile"
                    />
                </div>
                <CardContent>
                    <Typography component="p" className={classes.contentTask}>
                        {props.task.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Chip
                    label={props.task.assigned.name}
                    className={classes.chip}
                />
                {
                    logged_user === props.task.assigned.id && props.task.status === 'todo' &&
                        <Button size="small" color="primary" onClick={finished}>
                            Rozwiązane
                        </Button>
                    
                }
                
            </CardActions>
        </Card>
    );
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
Task.defaultProps = {
    priority: 'medium',
    assigned: {}
}

export default withStyles(styles)(Task);