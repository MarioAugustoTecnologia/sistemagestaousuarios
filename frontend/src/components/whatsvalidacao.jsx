function validation (values){
    let error = {}   

    const fone_pattern = /[0-9]{9,15}/  
    
    if(values.phone === ""){
        error.phone = "Campo não pode estar vazio !"
    } else if(!fone_pattern.test(values.phone)){
        error.phone = "Telefone não corresponde !" 
        }else{
            error.phone = ""
        }    
    
    if(values.msg === ""){
        error.msg = "Campo não pode estar vazio !"
    }else{
        error.msg = "" 
     }  
 

    return error;
    }
    
    export default validation; 