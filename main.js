// grab things we need
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

// linking text
playerLivesCount.textContent = playerLives;

//generate the data
const getData = () => [
    { imgSrc: "./images/1.jpeg", name: "1"},
    { imgSrc: "./images/2.jpeg", name: "2"},
    { imgSrc: "./images/3.jpeg", name: "3"},
    { imgSrc: "./images/4.jpeg", name: "4"},
    { imgSrc: "./images/5.jpeg", name: "5"},
    { imgSrc: "./images/6.jpeg", name: "6"},
    { imgSrc: "./images/7.jpeg", name: "7"},
    { imgSrc: "./images/8.jpeg", name: "8"},
    { imgSrc: "./images/1.jpeg", name: "1"},
    { imgSrc: "./images/2.jpeg", name: "2"},
    { imgSrc: "./images/3.jpeg", name: "3"},
    { imgSrc: "./images/4.jpeg", name: "4"},
    { imgSrc: "./images/5.jpeg", name: "5"},
    { imgSrc: "./images/6.jpeg", name: "6"},
    { imgSrc: "./images/7.jpeg", name: "7"},
    { imgSrc: "./images/8.jpeg", name: "8"},
];

// randomise
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5);
    return cardData;
}

// card generator function
const cardGenerator = () => {
    const cardData = randomize();
    
    // generate the html
    const cards = document.querySelectorAll('card');
    cardData.forEach(item =>{
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        // Attach the info to card
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);

        // Attach the cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) =>{
            card.classList.toggle('toggleCard')
            checkCards(e);
        })
    });
}

// check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    // logic
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        }
        else{
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1300);
            })
            setTimeout(() => {
                playerLives--;
                playerLivesCount.textContent = playerLives;
                if(playerLives === 0){
                    restart("Try again!");
            }}, 1300);
        }
    }
    // run a check to see if game is one
    setTimeout(() => {
        if(toggleCard.length === 16){
        restart("You Won");
    }}, 1300);
}

// restart the game
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        // randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
}

cardGenerator();