import { useEffect, useState } from 'react'
import './App.css'
import MemoryCards from './components/MemoryCards'

function App() {
  function generateDeck () {
    const symbols = ["🧐","🌽","🥰","🍋","🐯","⭐","🥳","🤢"]
    const deck = []
    for (let i = 0; i < 16; i++) {
      let card = {isFlipped: "false", symbol: symbols[i % 8]}
      deck.push(card)
    }
    return shuffle(deck)
  }
  
  
  function  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  const [deck, setDeck] = useState([])
  const [pickedCards, setPickedCards] = useState([])
  
  useEffect (() => {
    setDeck(generateDeck())
  }, [setDeck])

  //Function to handle the unflipping of cards

  function unflipCards (card1index, card2index) {
    let card1 = {...deck[card1index], isFlipped: "false"}
    let card2 = {...deck[card2index], isFlipped: "false"}
    let newDeck = deck.map((card,index) => {
      if (card1index === index) {
        return card1
      } if (card2index === index) {
        return card2
      }
      return card
    })
    setDeck(newDeck)
  }
  let cardsJSX = deck.map((card, index) => {
    return <MemoryCards symbol={card.symbol} isFlipped ={card.isFlipped} key={index} pickCard={() => pickCard(index)}/>
  })


  function pickCard (cardIndex) {
    if (deck[cardIndex].isFlipped === "false") {
      let cardToFlip = {...deck[cardIndex], isFlipped: "true"}
      let newPickedCards = pickedCards.concat(cardIndex)
      let newDeck = deck.map((card,index) => {
        if (cardIndex === index) {
          return cardToFlip
        }
        return card
      })

      if (newPickedCards.length == 2) {
        let card1index = newPickedCards[0]
        let card2index = newPickedCards[1]
        if(deck[card1index].symbol !== deck[card2index].symbol) {
          setTimeout(() =>  {unflipCards(card1index,card2index); setPickedCards([]);}, 1000)
        } else {
          //empty the cards array because the player found a match
          newPickedCards = []
        }
      }

      setDeck(newDeck)
      setPickedCards(newPickedCards)
      }else if (deck[cardIndex].isFlipped === "true") {
        return;
      }

  }
  

  return (
    <>
      <h1 className= "header">Memory Game</h1>
      <h3 className="subtitle">Match the Card to Win</h3>
      <div className= "container">
        {cardsJSX.slice(0,4)}
        {cardsJSX.slice(4,8)}
        {cardsJSX.slice(8,12)}
        {cardsJSX.slice(12,16)}
        </div>
      
    </>
  )
}

export default App
