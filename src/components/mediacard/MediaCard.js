import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyCard from '../mycard/MyCard';

const useStyles = makeStyles({
    card: {
        maxWidth: 300,
        margin:10
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <MyCard className={classes.media} alt={props.name} image={props.image} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Play
        </Button>
                <Button size="small" color="primary" onClick={props.learnmore}>
                    <p>Contributed By: </p><strong>{props.contributor}</strong>
                </Button>
            </CardActions>
        </Card>
    );
}
