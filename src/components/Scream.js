import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20, 
    },
}

export class Scream extends Component {
    render() {
            dayjs.extend(relativeTime)
            const { classes, scream : { body, createdAt, userImage, userHandle} } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia image={userImage} className='card-media'/> 
                    <CardContent className={classes.content}>
                        <Typography variant='h5'>{userHandle}</Typography>
                        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant='body1'>{body}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Scream)
