let configURL = "http://localhost:3000/"
let signUpURL = `${configURL}signup`
let logOutURL = `${configURL}logout`
let usersURL = `${configURL}users`

let container = document.querySelector(".first-view");

function displayWhoIsPlaying(user){
    //select div element with id="who-is-playing" and add text with username and remove hidden class
    let wIPDiv = document.createElement("h2");
    wIPDiv.innerHTML = ` ${user.username} is Playing`
    container.append(wIPDiv)
    //wIPDiv.innerHTML = `
      //  <h2> ${user.username} is Playing </h2>
        //`
    //wIPDiv.removeAttribute(".who-is-playing")   
    //wIPDiv.classList.remove("hidden")
}

function renderOperatorButtons(){
   // let container = document.querySelector(".first-view");
    //container.innerHTML = "";
    container.innerHTML =  `
        <button type="button" id="plus-operator-button">+</button>
        <button type="button" id="minus-operator-button">-</button>
        <button type="button" id="times-operator-button">*</button>
        <button type="button" id="divide-operator-button">/</button>
    `;

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

//remove hidden class on logout button.
//put an eventlistener on logout button that will send a delete request
//how do I keep track of current user? and submit userToken with fetch?
function displayLogoutButton(){
    let logoutButton = document.getElementById("logout-button");
    logoutButton.classList.remove("hidden");
    logoutButton.addEventListener("click", function(e){
        logOutObject = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            
            },
            body: JSON.stringify({
                user_id: user.id,
                username: user.username
            })
        }
        fetch(logOurURL, logOutObject)
        .then(response => response.json())
        .then(myjson => console.log(myjson))
        logoutButton.classList.add("hidden");
        //window.localStorage.removeItem(data.token) 
        //remove token to signout
    });   
}



function displayUsersGames(){
    let userToken = window.localStorage.getItem('userToken');
    fetch(usersURL)
    .then(function(response){ return response.json()})
    .then(function(myjson){ console.log(myjson)})
    .catch((error) => console.error("Error:", error))
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
        //let user = new User(userName, userPassword)
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                //"Accept": "application/json"
              },
            body: JSON.stringify({
                username: userName,
                password: userPassword
              })
        }
        //post fetch request
        fetch(signUpURL, configurationObject)
        .then((response) => {
            
            //debugger
            console.log('Response:', response)
            return response.json()
        })
        .then((myjson) => {
            
            console.log('Success:', JSON.stringify(myjson))
            window.localStorage.setItem('userToken', myjson.token)
            let user = new User(myjson.user.data.attributes.username, myjson.user.data.attributes.id)
            debugger
            let incompleteGame = new Game(myjson.user.included[0].attributes.id, myjson.user.included[0].attributes.points, myjson.user.included[0].attributes.stars, myjson.user.included[0].attributes.complete, myjson.user.included[0].attributes.user_id)

            //debugger
            //document.querySelector(".first-view").innerHTML = "";
            displayWhoIsPlaying(user);
            //renderOperatorButtons();

            //get the data of the user. create new user with the username, id attributes and new game with points, stars, status and id attributes
            //set token with in window.localStorage to  myjson.data.token
            //window.localStorage.setItem(myjson.data.token)
            //render game info on right panel
            //render username
            console.log("user:", user)
        })
        .catch(error => console.error('Error:', error))

        //user.id, user.username, incomplete_game.points, incomplete_games.stars, incomplete_game.id, incomplete_game.complete, incomplete_game.user_id
        //token

        //console.log("user:", user)


        //console.log(userName);
        //document.querySelector(".first-view").innerHTML = ""
        renderOperatorButtons();
        //render log out button 
        displayLogoutButton();

        displayUsersGames();
        
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

//window.localStorage.setItem('token')
//passed through header authorization: token



clickLogIn();
clickSignUp()
submitSignUp();