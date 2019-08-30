import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
            images: [],
            profile_picture: "",
            liked: false
        };
    }
    UNSAFE_componentWillMount() {
        // Get data from first API endpoint

        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profile_picture: JSON.parse(this.responseText).data.profile_picture

                });
            };
        });
        xhr.open("GET", this.props.baseUrl + "?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr.send(data);

        // Get data from second api all the images
        let xhrImages = new XMLHttpRequest();
        xhrImages.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                let imageArr = JSON.parse(this.responseText).data
                imageArr.forEach(element => {
                    var date = parseInt(element.created_time,10);
                    date = new Date(date * 1000); 
                    element.created_time = date.toLocaleString()
                    
                });
                reload(imageArr);
 
            }
        })
        xhrImages.open("GET", this.props.baseUrl + "media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrImages.send();
        
        function reload(imageArr){
            that.setState({
                images:imageArr   //JSON.parse(this.responseText).data
            });
        }


    }




    likeBtnHandler = (imageId) => {
        var i = 0
        var imageArray = this.state.images
        for (i; i < imageArray.length; i++) {
            if (imageArray[i].id === imageId) {
                if (imageArray[i].user_has_liked === true) {
                    imageArray[i].user_has_liked = false;
                    imageArray[i].likes.count--;
                    this.setState({
                        images: imageArray
                    });
                    break;
                } else {
                    imageArray[i].user_has_liked = true;
                    imageArray[i].likes.count++;
                    this.setState({
                        images: imageArray
                    });
                    break;

                }
            }


        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header profile_picture={this.state.profile_picture} />

                <div className="flex-container">
                    <Grid container spacing={3} justify="center" wrap="wrap" alignContent="center" className={classes.grid}>

                        {this.state.images.map(image => (
                            <Grid key={image.id} item xs={10} sm={5} className="grid-item">
                                <Card className={classes.card}>
                                    <CardHeader
                                        classes={{
                                            title: classes.title,
                                        }}
                                        avatar={
                                            <Avatar src={image.caption.from.profile_picture} className={classes.avatar}></Avatar>
                                        }
                                        title={image.caption.from.username}
                                        subheader={image.created_time}
                                        className={classes.cardheader}
                                    />
                                   
                                    <CardContent>
                                        <img src={image.images.standard_resolution.url} alt={profileImage} className={classes.media} />
                                        <div className="horizontal-rule"></div>
                                        <div className="image-caption">
                                            {image.caption.text.split("\n")[0]}
                                        </div>
                                        <div className="image-hashtags">
                                            {image.caption.text.split("\n")[1]}
                                        </div>
                                        <div>
                                            <IconButton className="like-button" aria-label="like-button" onClick={() => this.likeBtnHandler(image.id)}>
                                                {image.user_has_liked ? <FavoriteIcon className="image-liked-icon" fontSize="large" /> : <FavoriteBorderIcon className="image-like-icon" fontSize="large" />}
                                            </IconButton>
                                            <span>
                                                {image.likes.count} likes
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
                        ))}
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);