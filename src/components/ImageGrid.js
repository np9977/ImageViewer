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
            errorMessage: "",
            query: ""
        };
    }

    componentDidMount() {
        unsplash.photos.getRandomPhoto({ count: 25 })
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
            })
            .catch(err => {
                this.setState({
                    error: true,
                    errorMessage: err
                });
            });
    }

    searchImages = (query) => {
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
                console.log(json.results);
                this.setState({
                    images: json.results
                })
            });
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }

    render() {
        var images = this.state.images;
        var err = this.state.err;
        var errorMessage = this.state.errorMessage;
        var value = this.state.query
        if (!err) {
            console.log(this.state.query);
            return (
                <div className="container">
                    <div className="images">
                        <h1 className="title">Random Image Viewer</h1>
                        <div className="search">
                            <input className="searchBar" type="text" placeholder="Search Images" ref={input => this.search = input} onChange={this.handleInputChange} />
                            <button className="searchButton" type="button" onClick={() => { this.searchImages(this.state.query) }}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg></button>
                        </div>
                        {images.map(function (image) {
                            return <Image key={image.id} imgUrl={image.urls.small} author={image.user.name} authorUrl={image.links.html} downloadLink={image.urls.full} imgName={image.id} />
                        })}
                    </div>
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