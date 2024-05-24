function validation (values){
    let error = {}        
    
    if(values.campo === ""){
        error.campo = "Selecione para excluir !"
    }else{
        error.campo = ""   
    }

    return error;
    }
    
    export default validation; 