import React, { Component } from "react";
import cards from "./cards.json"
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import "./App.css";

let correctCount = 0;
let topScore = 0;
let message = "Click on an image to begin!"

class App extends Component{
    // Initialize state with cards.json
    state = {
        cards,
        correctCount,
        topScore,
        message
    };
    setClicked = id => {
        // Copy of state matches
        const cards = this.state.cards;
        // Filter clicked images
        const clickedCard = cards.filter(card => card.id === id);
        // If user already clicked image...
        if (clickedCard[0].clicked){
            correctCount = 0;
            message = "You guessed incorrectly!"
            // Reset all cards to start over
            for (let i = 0; i < cards.length; i++){
                cards[i].clicked = false;
            }
            this.setState({message});
            this.setState({correctCount});
            this.setState({cards});
        }
        // Continue game otherwise
        else if (correctCount < 8){
            // Set card's image to clicked: true
            clickedCard[0].clicked = true;
            correctCount++;
            message = "You guessed correctly!"
            // Set top score
            if (correctCount > topScore){
                topScore = correctCount;
                this.setState({topScore});
            }
            // Randomly shuffle images after correct guess
            cards.sort(function(a, b){return 0.5 - Math.random()});
            // Update state
            this.setState({message});
            this.setState({correctCount});
            this.setState({cards});
        }
        // If user wins ...
        else{
            clickedCard[0].clicked = true;
            correctCount = 0;
            message = "You won!";
            topScore = 9;
            this.setState({topScore});
            // Reset game to play again
            for (let i = 0; i < cards.length; i++){
                cards[i].clicked = false;
            }
            // Randomly shuffle images after winning game
            cards.sort(function(a, b){return 0.5 - Math.random()});
            // Update state
            this.setState({message});
            this.setState({correctCount});
            this.setState({cards});
        }
    };
    // Render App
    render(){
        return(
            <Wrapper>
                <Title>Clicky Game!</Title>
                {/* Show scores and messages */}
                <h3 className="scoreDiv">{this.state.message}</h3>
                <h3 className="scoreDiv card-header">Score: {this.state.correctCount} <br /> Top Score: {this.state.topScore}</h3>
                {/* Game Container */}
                <div className = "container">
                    <div className = "row">
                        {this.state.cards.map(card=>(
                            <MatchCard
                            setClicked={this.setClicked}
                            id={card.id}
                            key={card.id}
                            image={card.image}
                            />
                        ))}
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default App;