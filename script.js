const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-contaioner button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
        this.operation = null;
        this.previousValue = null;
    }

    addDigit(digit) {
        // Concatenar dígitos ao invés de substituir
        this.currentOperation += digit;
        this.updateScreen();
    }

    processOperation(operation) {
        if (this.currentOperation === "") return; // Não faz nada se não houver operação atual

        let current = parseFloat(this.currentOperation);
        
        if (this.operation && this.previousValue !== null) {
            // Realiza a operação pendente se já houver uma operação e valor anterior
            let operationValue = this.calculateResult(this.previousValue, current, this.operation);
            this.updateScreen(operationValue, operation);
            this.previousValue = operationValue;
        } else {
            // Define o valor atual como valor anterior e armazena a operação
            this.previousValue = current;
            this.operation = operation;
            this.updateScreen();
        }

        this.currentOperation = ""; // Limpa a operação atual após processar a operação
    }

    calculateResult(num1, num2, operation) {
        switch (operation) {
            case "+":
                return num1 + num2;
            // Adicione outros casos para operações como "-", "*", "/", etc., conforme necessário
            default:
                return num2;
        }
    }

    updateScreen(result = null, operation = null) {
        if (result === null) {
            this.currentOperationText.textContent = this.currentOperation;
        } else {
            if (operation) {
                this.previousOperationText.innerText = `${result} ${operation}`;
            } else {
                this.previousOperationText.innerText = result;
            }
            this.currentOperationText.innerText = "";
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
