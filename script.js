const text = document.querySelector(".Text")
const translation = document.querySelector(".Translation")
const changeBtn = document.querySelector(".fa-arrow-right-arrow-left")
const copybtn1 = document.querySelector(".copy1")
const copybtn2 = document.querySelector(".copy2")
const from = document.querySelector(".From")
const to = document.querySelector(".To")
const volbtn1 = document.querySelector(".vol1")
const volbtn2 = document.querySelector(".vol2")


changeBtn.addEventListener("click", changetext)

function changetext() {
    textVal = text.value
    transVal = translation.value
    fromVal = from.value
    toVal = to.value

    text.value = transVal
    translation.value = textVal
    from.value = toVal
    to.value = fromVal
}

copybtn1.addEventListener("click", funcCopy1)
copybtn2.addEventListener("click", funcCopy2)

function funcCopy1() {
    const text = document.querySelector(".Text")

    text.select()
    text.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(text.value)

    alert(`${text.value} copied`)
}
function funcCopy2() {
    const translation = document.querySelector(".Translation")

    translation.select()
    translation.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(translation.value)

    alert(`${translation.value} copied`)
}

volbtn1.addEventListener("click", speaktext1)
volbtn2.addEventListener("click", speaktext2)

function speaktext1() {
    const speech = new SpeechSynthesisUtterance(text.value);
    speech.lang = from.value;
    window.speechSynthesis.speak(speech);
}
function speaktext2() {
    const speech = new SpeechSynthesisUtterance(translation.value);
    speech.lang = to.value;
    window.speechSynthesis.speak(speech);
}

const transbtn = document.querySelector(".Transbtn")

transbtn.addEventListener("click", TranslateText)

async function TranslateText() {
    const textValue = text.value.trim()
    const fromLang = from.value
    const toLang = to.value

    if (textValue === "") {
        alert("Enter text please")
    }

    if (fromLang == "" || toLang == "") {
        alert("Enter languages")
    }

    translation.value = "Translating..."

    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textValue)}&langpair=${fromLang}|${toLang}`)

        const data = await res.json();

        translation.value = data.responseData.translatedText;
    }
    catch(err){
        translation.value = "Translation failed";
    }
}

