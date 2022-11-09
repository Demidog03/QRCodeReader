const wrapper = document.querySelector(".wrapper")
const form = document.querySelector(".wrapper form")
const fileInp = document.querySelector(".wrapper form input")
const infoText = document.querySelector(".wrapper .content h1")
const qrText = document.querySelector(".wrapper .details textarea")
const qrImage = document.querySelector(".wrapper form img")
const copyBtn = document.querySelector(".wrapper .buttons .copy")
const closeBtn = document.querySelector(".wrapper .buttons .close")
const copyHint = document.querySelector(".wrapper .buttons .copyHint")


// 'change' works when after some 'form' get some values or changes
fileInp.addEventListener('change', e => {
    infoText.innerHTML = 'Scanning QR Code...'
    //e.target.files - selected files
    let file = e.target.files[0] //getting first selected file
    if(!file) return
    let formData = new FormData(); //creating new FormData object
    formData.append("file", file) //adding file into object
    fetchRequest(formData, file)


})

// qrImage.src = file[0].

//using qr server API to read the qr code
function fetchRequest(formData, file){
    //sending post request to qr server API with passing
    fetch('http://api.qrserver.com/v1/read-qr-code/', {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data
        infoText.innerHTML = result ? 'Upload QR Code to Scan' : 'Could not scan QR Code!'
        if(result==null)return
        qrText.innerHTML = result
        qrImage.src = URL.createObjectURL(file)
        wrapper.classList.add('active')
        console.log(result)
    }).catch(()=>{
        infoText.innerHTML = 'Could not scan QR Code!'
    })
}


form.addEventListener('click', () => fileInp.click())

copyBtn.addEventListener('click', () => {
    let text = qrText.textContent
    navigator.clipboard.writeText(text)

    copyHint.style.opacity = 1
    copyHint.style.animation = 'append-animate 0.5s ease-in-out'
    setTimeout(()=>{
        copyHint.style.opacity = 0
    }, 2000)

})

closeBtn.addEventListener('click', () => wrapper.classList.remove('active'))