import React, { Component } from 'react';
import Card from './Card';
import './Game.css';
import axios from 'axios';

class Game extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
        this.drawCard = this.drawCard.bind(this);
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
            suit: data.cards[0].suit
        };
        this.setState((st) => ({ cards: [ ...st.cards, card ], remaining: st.remaining - 1 }));
    }

    render() {
        const cards = this.state.cards.map((card) => <Card image={card.image} suit={card.suit} value={card.value} />);
        return (
            <div>
                <button onClick={this.drawCard} disabled={this.state.remaining === 0}>
                    Draw Card
                </button>
                {cards}
            </div>
        );
    }
}

export default Game;
