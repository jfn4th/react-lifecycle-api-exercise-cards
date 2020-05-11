import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import styled from 'styled-components';

const StyledGame = styled.div``;

const Button = styled.button``;

const StyledCards = styled.div`
    text-align: center;
    margin-top: 70px;
`;

class Game extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
        this.drawCard = this.drawCard.bind(this);
        this.setTransform = this.setTransform.bind(this);
    }

    async componentDidMount() {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
        const response = await axios.get(url);
        const data = response.data;
        this.setState({ deckUrl: `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/`, remaining: data.remaining });
    }

    async drawCard() {
        const response = await axios.get(this.state.deckUrl);
        const data = response.data;
        const card = {
            image: data.cards[0].image,
            value: data.cards[0].value,
            suit: data.cards[0].suit,
            transform: this.setTransform()
        };
        this.setState((st) => ({ cards: [ ...st.cards, card ], remaining: st.remaining - 1 }));
    }

    setTransform() {
        const tx = Math.floor(Math.random() * 6);
        const ty = Math.floor(Math.random() * 6);
        const rdeg = Math.floor(Math.random() * 60) - 30;
        // const transform = {
        //     tx,
        //     ty,
        //     rdeg
        // };

        const transform = {
            transform: `translate(${tx}px, ${ty}px) rotate(${rdeg}deg)`
        };
        return transform;
    }

    render() {
        const cards = this.state.cards.map((card, idx) => (
            <Card key={idx} image={card.image} suit={card.suit} value={card.value} transform={card.transform} />
        ));
        return (
            <StyledGame>
                <Button onClick={this.drawCard} disabled={this.state.remaining === 0}>
                    Draw Card
                </Button>

                <StyledCards>{cards}</StyledCards>
            </StyledGame>
        );
    }
}

export default Game;
