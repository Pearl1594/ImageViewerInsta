import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Header from '../../common/header/Header';
import profileImage from "../../assets/upgrad.svg"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button';

import "./Home.css";


const styles = (theme => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        padding: "20px",
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: "56.25%",
        width: "100%",
        // paddingTop: '56.25%', // 16:9
    },
    avatar: {

        margin: 10,
        width: 60,
        height: 60,
    },
    title: {
        'font-weight': '600',
    },

    imageCommentText: {
        width: "80%",
    },

    addCommentBtn: {
        "margin-left": "15px",
    },
}));

class Home extends Component {


    constructor() {
        super()
        this.state = {
            liked: false
        };
    }



    likeBtnHandler = () => {
        this.state.liked ? this.setState({ ...this.state, liked: false }) : this.setState({ ...this.state, liked: true });
    };

    render() {
        var d = new Date();
        d = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + "/" + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        const { classes } = this.props;
        return (
            <div>
                <Header />

                <div className="flex-container">
                    <Grid container spacing={3} justify="center" wrap="wrap" alignContent="center" className={classes.grid}>
                        <Grid item xs={10} sm={5} className="grid-item">
                            <Card className={classes.card}>
                                <CardHeader
                                    classes={{
                                        title: classes.title,
                                    }}
                                    avatar={
                                        <Avatar src={profileImage} className={classes.avatar}>

                                        </Avatar>
                                    }

                                    title="upGrad"

                                    subheader={d}
                                    className={classes.cardheader}
                                />

                                <CardContent>
                                    {/* <CardMedia
                                        className={classes.media}
                                        image={profileImage}
                                        title="Instagram-Pictures"
                                    /> */}
                                    <img src={profileImage} className={classes.media} />
                                    <div className="horizontal-rule"></div>
                                    <div className="image-caption">
                                        Dummy Text & Image for now
                                 </div>
                                    <div className="image-hashtags">
                                        #AllDummmy #coolpictures #nicepicture #hotpicture #;D
                                 </div>
                                    <div>
                                        <IconButton className="like-button" aria-label="like-button" onClick={this.likeBtnHandler}>
                                            {this.state.liked ? <FavoriteIcon className="image-liked-icon" fontSize="large" /> : <FavoriteBorderIcon className="image-like-icon" fontSize="large" />}
                                        </IconButton>
                                        <span>
                                            7 likes
                                     </span>
                                    </div>
                                    <div className="image-comment-box">
                                        <Input className={classes.imageCommentText} placeholder="Add a comment" />
                                        <span>
                                            <Button variant="contained" color="primary" className={classes.addCommentBtn}>
                                                Add
                                         </Button>
                                        </span>

                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>


                </div>

            </div>


        )


    }


}

export default withStyles(styles)(Home);