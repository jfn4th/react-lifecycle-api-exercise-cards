import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    position: absolute;
    width: 100%;
`;

class Card extends PureComponent {
    render() {
        const { image, value, suit, transform } = this.props;

        return (
            <StyledCard>
                <img style={transform} src={image} alt={`${value} of ${suit}`.toLowerCase()} />;
            </StyledCard>
        );
    }
}

export default Card;
