import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    position: absolute;
    width: 100%;
`;

class Card extends PureComponent {
    constructor(props) {
        super(props);
        const tx = Math.floor(Math.random() * 40) - 20;
        const ty = Math.floor(Math.random() * 40) - 20;
        const rdeg = Math.floor(Math.random() * 90) - 45;
        this._transform = `translate(${tx}px, ${ty}px) rotate(${rdeg}deg)`;
    }

    render() {
        const { image, name } = this.props;

        return (
            <StyledCard>
                <img style={{ transform: this._transform }} src={image} alt={name.toLowerCase()} />;
            </StyledCard>
        );
    }
}

export default Card;
