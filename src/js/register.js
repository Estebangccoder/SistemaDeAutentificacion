//FORMULARIO

const form = document.querySelector("#register-form")
//INPUTS
const username = document.querySelector("#user-name")
const lastName = document.querySelector("#last-name")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirm-password")

form.addEventListener("submit", async (event) => {

    event.preventDefault()
    const checkPasswords = validatePassword(password, confirmPassword)
    const checkEmail = await validateEmail(email)

    // if(checkPasswords==true){
    //     alert("Son iguales")
    // }else{
    // alert("Son diferentes")

    //     if(checkEmail==true){
    //     alert("Puedes usar el correo")
    // }else{
    // alert("NO lo Puedes usar el correo")

    //}

    if (checkPasswords == true && checkEmail == true) {
        //Llamamos a la funcion que nos guarda el nuevo usuario
        registerUser(username, lastName, email, password)
    }
    window.location.href="/"


})








//valida que las contraseñas sean iguales
function validatePassword(password, confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true
    } else {
        return false
    }
}

//valida que el correo no exista
async function validateEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const data = await response.json() // convertimos de json a JavaScript

    if (data.length === 0) {
        return true
    } else {
        return false
    }


}

async function registerUser(username, lastName, email, password) {
    const newUser = {
        username: username.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value

    }


    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
    })
}
