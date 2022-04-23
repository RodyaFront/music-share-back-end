import {LoremIpsum} from 'lorem-ipsum'

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
})

const MOCK_ITEMS = [
    {
        id: 0,
        title: lorem.generateWords(5),
        text: lorem.generateSentences(5),
        date: new Date().getDate()
    },
    {
        id: 1,
        title: lorem.generateWords(5),
        text: lorem.generateSentences(5),
        date: new Date().getDate()
    },
    {
        id: 2,
        title: lorem.generateWords(5),
        text: lorem.generateSentences(5),
        date: new Date().getDate()
    },
]

module.exports = {MOCK_ITEMS}