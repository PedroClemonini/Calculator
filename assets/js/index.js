class Calculator {

    constructor(btn_numbers, btn_operations, btn_options, exhibition, pre_number = '', savedOperations = []) {
        this.btn_numbers = document.querySelectorAll(btn_numbers);
        this.btn_options = document.querySelectorAll(btn_options);
        this.btn_operations = document.querySelectorAll(btn_operations);
        this.exhibition = document.getElementById(exhibition);
        this.pre_number = pre_number;
        this.savedOperations = savedOperations;
    }
    //Esse método é usado para chamar todas os métodos para o funcionamento da Calculadora ;
    CalcMemory() {
        this.NumbersBtn()
        this.OperationsBtn()
        this.ResultBtn();
        this.DeleteBtn();
        this.NegativeBtn();
    }

    //Esse método é usado para armazenar de forma temporária os números digitados;
    NumbersBtn() {
        //Adicionando números temporariamente
        this.btn_numbers.forEach(btn => {
            btn.addEventListener('click', () => {
                //Verifica se o ultimo valor do array é um número, se for o array deve se tornar vazio
                if (this.IsLastElementNumber()) {
                    this.savedOperations = [];
                }
                this.pre_number += btn.textContent;
                this.ScreenExb(this.pre_number);
            });
        });
    }

    //Esse método é usado para adicionar o tipo da operação selecionada no array de operações;
    OperationsBtn() {
        //Caso uma operação seja selecionada o número é salvo no array;
        this.btn_operations.forEach(btn => {
            btn.addEventListener('click', () => {
                //Caso uma operação seja clicada a função de salvar o número é chamada e a operação é salva no array
                this.SaveValue(this.pre_number)

                //Só permite a continuidade se o tamanho do array for diferente de 0
                if (this.savedOperations.length != 0) {
                    //Só permite a adição da operação se o ultimo valor for um número.
                    if (this.IsLastElementNumber) {
                        console.log(`ultimo valor salvo:${this.savedOperations[this.savedOperations.length - 1]}`)
                        this.savedOperations.push(btn.textContent);
                        this.ScreenExb(btn.textContent)
                        this.pre_number = '';
                        console.log(this.savedOperations)
                    }
                }
            });
        })
    }

    //Esse método é usado para retornar o valor da operação quando '=' é pressionado;
    ResultBtn() {
        //Caso o igual seja selecionado o numero é salvo no array
        this.btn_options[4].addEventListener('click', () => {
            if (this.pre_number != '') {
                this.SaveValue(this.pre_number)
                //Mostra o resultado
                this.ScreenExb(this.savedOperations[0])
                this.pre_number = ''
            } else {
                alert('Operação inválida')
            }
        })
    }

    //Esse método agrupa todos os ouvintes responsáveis pelos botões ['<-' ; 'CE' ; 'C'];
    DeleteBtn(){
        //Deletando o ultimo caractere digitado (Tecla RETURN)
        this.btn_options[2].addEventListener('click', () => {
            this.pre_number = this.pre_number.slice(0, -1);
            this.ScreenExb(this.pre_number);
        })
        //Deletando todos os registros (Tecla C)
        this.btn_options[1].addEventListener('click', () => {
            this.savedOperations = [];
            this.pre_number = ''
            this.ScreenExb(this.pre_number);
        })
        //Deletando a ultima entrada de registro (Tecla CE)
        this.btn_options[0].addEventListener('click', () => {
            if (this.savedOperations.length != 0) {
                if (this.pre_number != '') {
                    this.savedOperations.push(parseFloat(this.pre_number));
                    this.pre_number = ''
                }
                this.savedOperations.pop()
                this.ScreenExb(this.savedOperations[this.savedOperations.length - 1])
            } else {
                alert('Operação inválida')
            }
        })
    }

    //Esse método é usado para negativar o número digitado;
    NegativeBtn() {
        //Configurando botão para transformar valor em negativo
        this.btn_options[3].addEventListener('click', () => {
            if (!isNaN(this.savedOperations[0])) {
                this.pre_number = this.savedOperations[0]
                this.savedOperations = []
            }
            this.pre_number = this.pre_number * (-1);
            this.ScreenExb(this.pre_number)
        })
    }

    //Esse método é usado para verificar se o último valor no Array principal é um número ou uma string;
    IsLastElementNumber(){
        if (!isNaN(this.savedOperations[this.savedOperations.length - 1])) {
            return 1;
        }else{
            return 0;
        }
    }

    //Esse método é usado para realizar as operações da calculadora no formato de pilha;
    OperationResult() {
        if (this.savedOperations.length === 3) {
            let pre = Function("return " + this.savedOperations.join(''))();
            this.savedOperations = [pre];
            console.log(this.savedOperations)
        }

    }

    //Esse método é usado para retornar variáveis desejadas na tela em formato HTML;
    ScreenExb(displaying) {
        this.exhibition.innerHTML = `<p>${displaying}</p>`;
    }

    //Esse método é usado para salvar um número dentro do array princiapl;
    SaveValue(newValue) {
        //Verifica se o número recebido é diferente de zero para ser salvo
        if (newValue != '') {
            this.savedOperations.push(parseFloat(newValue));
            this.OperationResult()
        }
    }
};

const calc = new Calculator('.calc-button', '.calc-oper', '.calc-opt', 'value-exb',)
calc.CalcMemory();
