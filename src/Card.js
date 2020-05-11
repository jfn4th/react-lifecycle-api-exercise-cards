import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    render() {
        const { image, value, suit } = this.props;
        return <img src={image} alt={`${value} of ${suit}`} />;
    }
}

export default Card;
