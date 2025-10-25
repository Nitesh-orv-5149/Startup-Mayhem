const teamSchema = {
    teamId : String,
    startup : String,
    sector : String,
    password : String,
    budget : Number,
    runway : Number,
    cac : Number,
    ltv : Number,   
    power : String,
    weakness :String,
    subtitle : String,
    ownedCards : []
}

const cardSchema = {
    cardId : String,
    cardName : String,
    cardFunction : String,
    type : String,
    cardCount : Number,
    price : Number,
    effect : String,
}