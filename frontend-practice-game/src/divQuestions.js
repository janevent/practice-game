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

     

    //renderDivQuestion(){
      //  this.generateDivQuestions();
        //divQuestion = this.getDivQuestion();
        //questionBox.innerHTML = `
        //<form>
        //${divQuestion.num1} / ${divQuestion.num2} = 
        //<input type="text" id="answer-input"/>
        //<button type="submit" name="submit" id="check-button" value="check"/>
        //</form>`
    //}

}