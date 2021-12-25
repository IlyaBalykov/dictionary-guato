const contentSection = document.querySelector('.content');
const wordValue = document.querySelector('.search-form__input')

const search = () => {
  const renderItems = (data) => {
    console.log()
    console.log(data);
    data.forEach(({word, image, audio, por, eng}, index) => {
      if (eng === wordValue.value) {
        console.log(data[index].eng);
        renderDiv(data, index)
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

function renderDiv(data, index) {
  if (contentSection.hasChildNodes()) {
    contentSection.removeChild(contentSection.childNodes[0])
  }
  const contentDiv = document.createElement('div')
  contentDiv.innerHTML = `
        <div>
          <span>Translate: </span>
          <span>${data[index].word}</span>
        </div> 
      `
  contentSection.append(contentDiv);
}