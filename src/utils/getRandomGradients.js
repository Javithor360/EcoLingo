import feedbackData from '../content/data/feedbackMessages.json';

const getRandomMessage = (type) => {
    const messages = feedbackData.feedbackMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
}

export default getRandomMessage;