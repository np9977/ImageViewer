import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
    render() {
        return (
            <div className="container">
                <div className="image">
                    <a href={this.props.downloadLink} download={this.props.imgName}><img className="picture" src={this.props.imgUrl} alt="Random image" /></a>
                    <p className="imageText">Photo by <a className="authorName" href={this.props.authorUrl}>{this.props.author}</a> on Unsplash</p>
                </div>
            </div>
        );
    }
}

export default Image;