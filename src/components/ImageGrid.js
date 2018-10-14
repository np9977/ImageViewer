import React, { Component } from 'react';
import Unsplash, { toJson } from "unsplash-js";
import Image from './Image';
import './ImageGrid.css';

const applicationId = "5420f4ad8be2d26819d0fd9a0309c6d30c376d661246cd410617e63ba4325829"
const secret = "6c83b2b629d847b65589d11edf86ec34c8c53e458ba70cff2bb673622f4f1b34"
var unsplash = new Unsplash({
    applicationId: applicationId,
    secret: secret,
    callbackUrl: "{CALLBACK_URL}"
});

class ImageGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            error: false,
            errorMessage: ""
        };
    }

    componentDidMount() {
        unsplash.photos.getRandomPhoto({ count: 25 })
            .catch(err => {
                this.setState({
                    error: true,
                    errorMessage: err
                });
            })
            .then(toJson, function (err) {
                this.setState({
                    error: true,
                    errorMessage: err
                });
            })
            .then(json => {
                this.setState({
                    images: json
                })
            });
    }

    searchImages(query) {
        unsplash.search.photos(query, 1, 25)
            .catch(err => {
                this.setState({
                    error: true,
                    errorMessage: err
                });
            })
            .then(toJson, function (err) {
                this.setState({
                    error: true,
                    errorMessage: err
                })
            })
            .then(json => {
                this.setState({
                    images: json
                })
            });
    }

    render() {
        var images = this.state.images;
        var err = this.state.err;
        var errorMessage = this.state.errorMessage;
        if (!err) {
            return (
                <div className="images">
                    <h1 className="title">Random Image Viewer</h1>
                    {images.map(function (image) {
                        return <Image imgUrl={image.urls.small} author={image.user.name} authorUrl={image.links.html} downloadLink={image.urls.full} imgName={image.id} />
                    })}
                </div>
            );
        } else {
            return (
                <div>{errorMessage}</div>
            )
        }

    }
}

export const downloadImage = (downloadLink) => {
    unsplash.photos.downloadPhoto(downloadLink);
}

export default ImageGrid;