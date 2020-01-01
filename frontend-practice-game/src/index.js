let configURL = "http://localhost:3000/"
let signUpURL = `${configURL}users/signup`



function renderOperatorButtons(){
    let container = document.querySelector(".first-view");
    container.innerHTML = "";
    container.innerHTML = `
        <button type="button" id="plus-operator-button">+</button>
        <button type="button" id="minus-operator-button">-</button>
        <button type="button" id="times-operator-button">*</button>
        <button type="button" id="divide-operator-button">/</button>
    `

    let pOB = document.getElementById("plus-operator-button");
    let mOB = document.getElementById("minus-operator-button");
    let tOB = document.getElementById("times-operator-button");
    let dOB = document.getElementById("divide-operator-button");

   // pOB.addEventListener("click", function(e){
     //   let fN = float(random(0) + 1);
        // Math.floor(Math.random() * 100) + 1
       // let newAdditionQuestion = new Question()
        //question is random number between 1 and 100 + random number between 1 and 100
        //renders a question added on to the container HTML
        //need a question generator class?
    //});

    //mOB.addEventListener("click", function(e){
        
    //});

    //tOB.addEventListener("click", function(e){

    //})

    //dOB.addEventListener("click", function(e){

    //})


}

function submitSignUp(){
    let signUpSubmitB = document.getElementById("sign-up-submit");
    //debugger
    if(!!signUpSubmitB){
        //debugger
    signUpSubmitB.addEventListener("click", function(e){
        //debugger
        //create configurationObject 
        let nameInput = document.getElementById("sign-up-name");
        let userName = nameInput.value;
        //debugger
        let passwordInput = document.getElementById("sign-up-password");
        let userPassword = passwordInput.value;
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            body: JSON.stringify({
                name: userName,
                password: userPassword
              })
        }
        //post fetch request
        fetch(signUpURL, configurationObject)
        .then(function(response){
            return response.json
        })
        .then(function(json){
            console.log(json)
        })
        console.log(userName);
        document.querySelector(".first-view").innerHTML = ""
        renderOperatorButtons();
    })
    }
}

function clickLogIn (){
    let logInButton = document.getElementById("log-in-1");
    logInButton.addEventListener("click", function(e){
        console.log(e);
        document.querySelector(".first-view").innerHTML = `<form id="log-in-form">Name:<br>
        <input type="text" name="name"><br>
        password: <br>
        <input type="text" name="password"><br>
        <input type="submit" id="log-in-submit" value="Submit">
        </form>`
    })
}

function clickSignUp(){
    let signUpButton = document.getElementById("sign-up-1");
    signUpButton.addEventListener("click", function(e){
        console.log(e);
        document.querySelector(".first-view").innerHTML = `<form id="sign-up-form">Name:<br>
        <input type="text" name="name" id="sign-up-name"><br>
        password: <br>
        <input type="text" name="password" id="sign-up-password"><br>
        <input type="submit" id="sign-up-submit" value="Submit">
        </form>`
        submitSignUp();
        
    })

}



clickLogIn();
clickSignUp()
submitSignUp();