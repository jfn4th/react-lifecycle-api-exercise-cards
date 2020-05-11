import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const StyledCard = styled.img`
    position: absolute;
    transform: transform(${(props) => `${props.transform}, 20px`});
`;

class Card extends Component {
    render() {
        const { image, value, suit, transform } = this.props;

        return (
            <StyledCard
                style={{ transform: `translate(${transform.tx}px, ${transform.ty}px) rotate(${transform.rdeg}deg)` }}
                src={image}
                alt={`${value} of ${suit}`.toLowerCase()}
            />
        );
    }
}

export default Card;
