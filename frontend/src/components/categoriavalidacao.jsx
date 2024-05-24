function validation (values){
    let error = {}  

    const nome_pattern = /[A-Z][a-z]{8,10}/
  
    if(values.nome === ""){
        error.nome= "Nome não pode ser vazio !"
    } else if(!nome_pattern.test(values.nome)){
        error.nome = "Nome não corresponde !"
        }else{
            error.nome = ""
        }
    

    return error;
    }
    
    export default validation; 