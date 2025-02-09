import {gradients} from '../content/data/gradientsTW.json';

const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
};

export default getRandomGradient;