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

}

User.currentUser = "";