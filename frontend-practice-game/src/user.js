class User {

    constructor(username, id, password){
        this.username = username;
        this.password = password;
        this.id = id;
        User.currentUser = this;
    }

    static get clear(){
        User.currentUser = "";
    }

    static get user(){
        return User.currentUser;
    }

    static displayWhoIsPlaying(){
        //select div element with id="who-is-playing" and add text with username and remove hidden class
        //debugger
        let h2 = document.querySelector(".put-name-here");
        //debugger
        //let user = JSON.parse(window.localStorage.getItem("currentUser"));
        let user = User.user;
        let token = window.localStorage.userToken;
        let configUser = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(`http://localhost:3000/users/${user.id}`, configUser)
        .then(response => response.json())
        .then((myjson) => {
            console.log(myjson)
            
            let completeGames = 0;
            let incompleteGames = 0;
            //debugger
            for(let i = 0; i < myjson.included.length; i++){
                console.log("game:", myjson.included[i])
                if(myjson.included[i].attributes.complete === true){
                    completeGames = completeGames + 1;
                }else if(myjson.included[i].attributes.complete === false){
                    incompleteGames = incompleteGames + 1;
                }
            }
            h2.innerHTML = `
            ${myjson.data.attributes.username} is working on ${incompleteGames} and has Won ${completeGames}!
            `
        })
    }
    

}

User.currentUser = "";