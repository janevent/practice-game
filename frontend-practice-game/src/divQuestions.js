class DivQuestions {


    static generateDivQuestions(){
        let divQuestions = [];
        for(let a = 1; a < 11; a++){
            for(let b = 1; b < 11; b++){
                let c = a * b;
                divQuestions.push(new Question(c, "/", a, b));
                divQuestions.push(new Question(c, "/", b, a))
            }
        }
        return divQuestions;
    }

}