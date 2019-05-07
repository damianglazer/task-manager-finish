import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Element from './element';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginTop: 24
    },
    gridList: {
        width: '100%',
        transform: 'translateZ(0)',
        background: 'transparent'
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
});


function ListTasks(props) {
    const { classes } = props;

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
          return 5;
        }
    
        if (isWidthUp('lg', props.width)) {
          return 4;
        }
    
        if (isWidthUp('md', props.width)) {
          return 3;
        }

        if (isWidthUp('sm', props.width)) {
          return 2;
        }
    
        return 1;
      }
    const { tasks } = props;
    return (
        <div className={classes.root}>
            <GridList cellHeight={300} spacing={50} className={classes.gridList} cols={getGridListCols()}>
                {
                    tasks.map( (task, key) =>
                        <GridListTile cols={1} rows={1} key={key}>
                            <Element task={task} />
                        </GridListTile>
                    )
                }
            </GridList>
        </div>
    );
}

ListTasks.propTypes = {
    classes: PropTypes.object.isRequired,
};

ListTasks.defaultProps = {
    tasks: []
}

export default withWidth()(withStyles(styles)(ListTasks));