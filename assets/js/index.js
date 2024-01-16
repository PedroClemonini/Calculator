class Calculator{
    constructor(btn_numbers, btn_operations, btn_options,exhibition,savedOperations=[]){
        this.btn_numbers = document.querySelectorAll(btn_numbers);
        this.btn_options = document.querySelectorAll(btn_options);
        this.btn_operations = document.querySelectorAll(btn_operations);
        this.exhibition = document.getElementById(exhibition);

        this.savedOperations = savedOperations;
    }

    SaveValue(newValue){
        //Verifica se o número recebido é diferente de zero para ser salvo
        if(newValue != ''){
            this.savedOperations.push(parseFloat(newValue));
            this.OperationResult()
        }
    }

    CalcMemory() {

        let number = '';
        //Adicionando números temporariamente
        this.btn_numbers.forEach(btn => {
            btn.addEventListener('click', () => {
                //Verifica se o ultimo valor do array é um número, se for o array deve ser vazio
                if(!isNaN(this.savedOperations[this.savedOperations.length -1])){
                    this.savedOperations = [];
                }
                number += btn.textContent;
                this.ScreenExb(number);
                console.log(number)
            });
        });

        //Caso uma operação seja selecionada o número é salvo no array;
        this.btn_operations.forEach(btn =>{
            btn.addEventListener('click', () => {
                //Caso uma operação seja clicada a função de salvar o número é chamada e a operação é salva no array
                this.SaveValue(number)

                //Só permite a continuidade se o tamanho do array for diferente de 0
                if(this.savedOperations.length != 0){
                   //Só permite a adição da operação se o ultimo valor for um número.
                    if(!isNaN(this.savedOperations[this.savedOperations.length -1])){
                    console.log(`ultimo valor salvo:${this.savedOperations[this.savedOperations.length -1]}`)
                        this.savedOperations.push(btn.textContent);
                        this.ScreenExb(btn.textContent)
                        number = '';
                        console.log(this.savedOperations)
            }
        }
            });
        })


        //Caso o igual seja selecionado o numero é salvo no array
        this.btn_options[4].addEventListener('click', () =>{
            if(number != ''){
                this.SaveValue(number)
                //Mostra o resultado
                this.ScreenExb(this.savedOperations)
                number=''
                console.log(number)
            }else{
                alert('Operação inválida')
            }
        })
        //Deletando o ultimo caractere digitado (Tecla RETURN)
        this.btn_options[2].addEventListener('click', () =>{
            number = number.slice(0,-1);
                console.log(number)
                this.ScreenExb(number);
        })
        //Deletando todos os registros (Tecla C)
        this.btn_options[1].addEventListener('click', () =>{
            this.savedOperations = [];
            number = ''
            this.ScreenExb(number);
        })
        //Deletando a ultima entrada de registro (Tecla CE)
        this.btn_options[0].addEventListener('click', () =>{
            if(this.savedOperations.length !=0){
                if(number!=''){
                    this.savedOperations.push(parseFloat(number));
                    number = ''
                }
                this.savedOperations.pop()
                this.ScreenExb(this.savedOperations[this.savedOperations.length-1])
        }else{
            alert('Operação inválida')
        }
        })
        //Configurando botão de negação
        this.btn_options[3].addEventListener('click', () =>{
            if(!isNaN(this.savedOperations[0])){
                number = this.savedOperations[0]
                this.savedOperations = []
            }
            number = number * (-1);
            this.ScreenExb(number)
        })
    }

    ScreenExb(displaying){
        this.exhibition.innerHTML = `<p>${displaying}</p>`;
    }

    OperationResult(){    
        if(this.savedOperations.length === 3){
            let pre = Function("return " + this.savedOperations.join(''))();
             this.savedOperations = [pre];
             console.log(this.savedOperations)
        }
            
    }
    init(){
        this.CalcMemory();
    }
};
   
const calc = new Calculator('.calc-button','.calc-oper','.calc-opt','value-exb',)

calc.init();
