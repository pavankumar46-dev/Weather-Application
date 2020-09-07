console.log("Client Side java script file")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")


weatherForm.addEventListener("submit", (e) =>{
//Prevent browser from refreshing
    e.preventDefault()
    const address = search.value

    messageOne.textContent = "loading........"
    messageTwo.textContent = ""
    messageThree.textContent = ""
        
    fetch("weather?address="+address).then((response) =>{
    response.json().then((data)=>{
        if (data.error)  {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.address
            messageThree.textContent = data.placename
        }
    })
})
})