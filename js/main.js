const wordValue = document.querySelector('.search__input')
const wordExample = document.querySelector('.word-example')
const translateOutput = document.querySelector('.translate')
const phoneticsOutput = document.querySelector('.phonetics')
const phonemicsOutput = document.querySelector('.phonemics')
const classOutput = document.querySelector('.class')
const semanticOutput = document.querySelector('.semantics')
const definitionOutput = document.querySelector('.definition')
const exTranscriptionOutput = document.querySelector('.example-transcription')
const exPhoneticsOutput = document.querySelector('.example-phonetics')
const exTranslateOutput = document.querySelector('.example-translate')


const audioExample = document.querySelector('.audio')
const transLanguage = document.querySelector('.trans-ordinary')

function changeLang() {
  wordValue.value = ""
  ready()
}

function ready() {
  console.log(transLanguage.value)
  const createDatalist = (data) => {
    if(wordExample.hasChildNodes()) {
      while(wordExample.firstChild){
        wordExample.firstChild.remove()
      }
    }
    data.forEach(({por, eng}) => {
      const wordOption = document.createElement("option");
      switch (transLanguage.value) {
        case 'por':
          wordOption.value = por;
          break
        case 'eng':
          wordOption.value = eng;
          break
        default:
          wordOption.value = por;
          break
      }
      if (wordOption.value !== "undefined") {
        wordExample.append(wordOption)
      }
    })
  }
  console.log("Готов к загрузке слов...")
  fetch(`https://dictionary-d560e-default-rtdb.firebaseio.com/words.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Получаем слова...")
        createDatalist(data)
    })
    .catch((error) => {
      console.log(error)
    })

}
document.addEventListener("DOMContentLoaded", ready);

function search() {
  const renderItems = (data) => {
    console.log(data);
    data.forEach(({por, eng}, index) => {
      if ((transLanguage.value === "por") && (por === wordValue.value)) {
        console.log("Вывожу...");
        renderOutput(data, index) //Передаем все данные. Можно только нужные
      } else if ((transLanguage.value === "eng") && (eng === wordValue.value)) {
        console.log("Вывожу...");
        renderOutput(data, index) //Передаем все данные. Можно только нужные
      }
    })
  }
  fetch(`https://dictionary-d560e-default-rtdb.firebaseio.com/words.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log()
      renderItems(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function renderOutput(data, index) {
    translateOutput.value = `${data[index].translate}`;
    phoneticsOutput.value = `${data[index].phonetics}`;
    phonemicsOutput.value = `${data[index].phonemics}`;
    classOutput.value = `${data[index].class}`;
    semanticOutput.value = `${data[index].semantics}`;
    definitionOutput.value = `${data[index].definition}`;
    exTranscriptionOutput.value = `${data[index].exampleTranscriptionOne}`;
    exPhoneticsOutput.value = `${data[index].examplePhoneticsOne}`;
    exTranslateOutput.value = `${data[index].examplePor}`;
    audioExample.src = `./assets/audio/${translateOutput.value}.wav`;
}