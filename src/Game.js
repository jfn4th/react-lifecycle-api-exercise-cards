import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import styled from 'styled-components';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

const StyledGame = styled.div`
    margin-top: 1em;
    font-family: "Slabo 27px", serif;
`;
const Header = styled.h1`
    color: azure;
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: 5px;
`;
const Button = styled.button`
    background: none;
    border: 2px solid;
    outline: none;
    font: inherit;
    margin: 0.5em;
    padding: 1em 2em;
    color: #009688;
    transition: 0.25s;

    &:hover {
        border-color: #4caf50;
        color: white;
        box-shadow: inset 0 0 0 2em #4caf50;
    }
`;
const StyledCards = styled.div`
    text-align: center;
    margin-top: 70px;
`;

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
        this.drawCard = this.drawCard.bind(this);
    }

    async componentDidMount() {
        const deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({ deckId: deck.data.deck_id, remaining: deck.data.remaining });
    }

    async drawCard() {
        const id = this.state.deckId;
        const cardUrl = `${API_BASE_URL}/${id}/draw/`;
        const cardRes = await axios.get(cardUrl);
        const card = {
            id: cardRes.data.cards[0].code,
            image: cardRes.data.cards[0].image,
            name: `${cardRes.data.cards[0].value} of ${cardRes.data.cards[0].suit}`
        };
        this.setState((st) => ({ cards: [ ...st.cards, card ], remaining: st.remaining - 1 }));
    }

    render() {
        const cards = this.state.cards.map((card) => <Card key={card.id} image={card.image} name={card.name} />);
        return (
            <StyledGame>
                <Header>♦ Card Dealer ♦</Header>
                <Button onClick={this.drawCard} disabled={this.state.remaining === 0}>
                    Draw a Card!
                </Button>

                <StyledCards>{cards}</StyledCards>
            </StyledGame>
        );
    }
}

export default Game;
