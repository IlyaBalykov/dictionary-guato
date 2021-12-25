const wordValue = document.querySelector('.search__input')
const wordExample = document.querySelector('.word-example')
const translateOutput = document.querySelector('.translate')
const transcriptOutput = document.querySelector('.transcription')
const audioExample = document.querySelector('.audio')

function ready() {
  const createDatalist = (data) => {
    data.forEach(({por}) => {
      const wordOption = document.createElement("option");
      wordOption.value = por;
      wordExample.append(wordOption);
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

const search = () => {
  const renderItems = (data) => {
    console.log(data);
    data.forEach(({word, image, audio, por, eng, transcript}, index) => {
      if (por === wordValue.value) {
        console.log(data[index].por);
        renderOutput(data, index)
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
  if ((translateOutput.value || transcriptOutput.value || audioExample.src) !== "") {
    translateOutput.value = "";
    transcriptOutput.value = "";
    translateOutput.value = `${data[index].word}`;
    transcriptOutput.value = `${data[index].transcript}`;
    audioExample.src = `./assets/audio/${translateOutput.value}.wav`
  } else {
    translateOutput.value = `${data[index].word}`;
    transcriptOutput.value = `${data[index].transcript}`;
    audioExample.src = `./assets/audio/${translateOutput.value}+'wav'`
  }
}