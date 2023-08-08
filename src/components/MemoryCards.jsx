import "./MemoryCards.css"



const MemoryCards = (props) => {

    let flip = props.isFlipped === 'false' ? "MemoryCardInner" : "MemoryCardInner flipped";

    return (
      <div className = "MemoryCard" onClick = {props.pickCard}>
        <div className={flip}>
            <div className= "MemoryCardBack"><img src="">
        </img></div>
            <div className= "MemoryCardFront">{props.symbol}</div>
            </div>
      </div> 
    )
}

export default MemoryCards