
class App {

    static displayLogoutButton(){
        let logoutButton = document.getElementById("logout-button");
        logoutButton.classList.remove("hidden");
        User.clickLogOutButton(); 
    }

    static clickLogIn (){
        let container = document.querySelector(".first-view");
        let logInButton = document.getElementById("log-in-1");
        logInButton.addEventListener("click", function(e){
            console.log(e);
            container.innerHTML = `<form id="log-in-form">Name:<br>
            <input type="text" name="name" id="log-in-name"><br>
            password: <br>
            <input type="text" name="password" id="log-in-password"><br>
            <br>
            <input type="submit" id="log-in-submit" value="Submit">
            </form>`
            User.submitLogIn();
        })
    }

    static clickSignUp(){
        let container = document.querySelector(".first-view");
        let signUpButton = document.getElementById("sign-up-1");
        signUpButton.addEventListener("click", function(e){
            console.log(e);
            container.innerHTML = `<form id="sign-up-form">Name:<br>
            <input type="text" name="name" id="sign-up-name"><br>
            password: <br>
            <input type="text" name="password" id="sign-up-password"><br>
            <br>
            <input type="submit" id="sign-up-submit" value="Submit">
            </form>`
            User.submitSignUp();       
        })
    }

    static run(){
        App.clickLogIn();
        App.clickSignUp();
    }
}
