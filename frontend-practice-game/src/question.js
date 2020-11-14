class Question{
    constructor(firstNum, operator, secondNum, thirdNum){
        this.firstNum = firstNum;
        this.operator = operator;
        this.secondNum = secondNum; 
        this.thirdNum = thirdNum;
    }

    checkAnswer(answer){
        if(eval(`${this.firstNum} ${this.operator} ${this.secondNum}`) === parseInt(answer)){
            return true;
        } else {
            return false;
        }
    }

    renderQues(){
        //let qf = document.querySelector(".question-form");
        Select.questionForm().innerHTML = `
        <br>
        <form id="question-form">${this.firstNum} ${this.operator} ${this.secondNum} = <input type="text" name="answer" id="user-answer"><input type="submit" id="check-answer" value="check"></form>
        `
    }

    addEventListenerOnCheck(){
        //debugger
        let checking = document.querySelector("form");
        checking.addEventListener("submit",(e) => {
            e.preventDefault();
            //debugger
            let answer = document.querySelector("#user-answer").value;
            let answerField = document.querySelector("#user-answer");
            if(!answerField.classList.contains("green")){
                //debugger
                let check = this.checkAnswer(answer);
                console.log("check:", check)
                if(check){
                    // render answer green
                    answerField.classList.add("green");
                    // render answer green
                    Game.updateCurrentGame(); 
                    //listen for change
                    answerField.addEventListener("input", function(e){
                        console.log(e, e.target)
                        answerField.classList.remove("green")
                    })                
                } else {
                    answerField.classList.add("red");
                    //render answer red 
                    answerField.addEventListener("input", function(e){    
                        answerField.classList.remove("red")   
                    }) 
                }       
            }           
            OperatorButtons.addEventListenerOnPlus();
            OperatorButtons.addEventListenerOnMinus();
            OperatorButtons.addEventListenerOnTimes();
            OperatorButtons.addEventListenerOnDivide();
        })
        let answerField = document.querySelector("#user-answer");
    }
    

    
}

//
//eval("2/2")