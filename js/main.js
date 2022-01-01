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
const transOrdinary = document.querySelector('.trans-ordinary')
const transStudied = document.querySelector('.trans-studied')
const transPor = document.querySelector('.translate-por')
const transEng = document.querySelector('.translate-eng')

let direction = "ordinary-studied";

//сделать одной функцией
document.addEventListener("DOMContentLoaded", change)
document.addEventListener("DOMContentLoaded", ready)

function ready() {
  transOrdinary.style.order = "0";
  transStudied.style.order = "2";
}

function changeLang() {
  change()
  wordValue.value = ""
}

function changeTranslate() {
  console.log("Меняем направление!")
  wordValue.value = ""
  $(".content__translate-to-studied").toggle()
  $(".content__example-to-studied").toggle()
  $(".content__translate-to-ordinary").toggle()

  if (transOrdinary.style.order === "0") {
    transOrdinary.style.order = "2";
    transStudied.style.order = "0";
    direction = "studied-ordinary";
    
  } else {
    transOrdinary.style.order = "0";
    transStudied.style.order = "2";
    direction = "ordinary-studied";
  }
  change()
}

function change() {
  console.log(direction)
  console.log(transLanguage.value)
  const createDatalist = (data) => {
    if(wordExample.hasChildNodes()) {
      while(wordExample.firstChild){
        wordExample.firstChild.remove()
      }
    }
    data.forEach(({por, eng, translate}) => {
      const wordOption = document.createElement("option");
      if (direction === "ordinary-studied") {
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
      } else {
        wordOption.value = translate;
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

function search() {
  const renderItems = (data) => {
    console.log(data);
    data.forEach(({por, eng, translate}, index) => {
      console.log(direction)
      if (direction === "ordinary-studied") {
        if ((transLanguage.value === "por") && (por === wordValue.value)) {
          console.log("Вывожу...");
          renderOutput(data, index) //Передаем все данные. Можно только нужные
        } else if ((transLanguage.value === "eng") && (eng === wordValue.value)) {
          console.log("Вывожу...");
          renderOutput(data, index) //Передаем все данные. Можно только нужные
        }
      } else {
        if (translate === wordValue.value) {
          console.log("НАОБОРОТ")
          renderOutputToOrdinary(data, index)
        }
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

function renderOutputToOrdinary(data, index) {
  transPor.value = `${data[index].por}`;
  transEng.value = `${data[index].eng}`;
}