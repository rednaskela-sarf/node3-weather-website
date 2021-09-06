//fetch = browser side API
//http://puzzle.mead.io/puzzle

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


//getting weather form
const weatherForm = document.querySelector('form')
//getting input element from form
const searchTerm = document.querySelector('input')
//getting p elements to populate 
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

//adding avent listener to a form
weatherForm.addEventListener('submit', (event) => {
    //prevents browser from refreshing and clearing form data
    event.preventDefault()

    //get location to find from inpt field
    const location = searchTerm.value

    fetch('/weather?address=' + 
            encodeURIComponent(location)).then((response) => {
            response.json().then((data) => {
            messageOne.textContent = 'Loading ...'
            messageTwo.textContent = ''
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = 'Weather forecast in ' + data.location + ' is ...'
                messageTwo.textContent = data.forecast
            }
        })
    })
})