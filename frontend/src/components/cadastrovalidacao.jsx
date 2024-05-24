function validation (values){
    let error = {}
    
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,15}$/
    const fone_pattern = /()[0-9]{9,10}/
    const salario_pattern = /[0-9].{4,8}/ 
  
    
    if(values.nome === ""){
        error.nome= "Nome não pode ser vazio !"
    }else{
        error.nome = ""   
    }
    if(values.email === ""){
        error.email= "Email não pode ser vazio !"
    } else if(!email_pattern.test(values.email)){
        error.email = "Email não corresponde !" 
        }else{
            error.email = ""
        }
    if(values.senha === ""){
        error.senha= "Senha não pode ser vazio !"
    }else if(!password_pattern.test(values.senha)){
        error.senha = 'Senha não corresponde !'
        }else{
           error.senha = '' 
        }

    if(values.fone !== '' && !fone_pattern.test(values.fone)){
            error.fone = 'Telefone não corresponde !'
    }else{
            error.fone = '' 
    }    
    
    if(values.data_nascimento === ""){
        error.data_nascimento= "Data não pode ser vazio !"
    }else{
        error.data_nascimento = '' 
     }


     if(values.cat_id === ""){
        error.cat_id= "Selecione a Categoria !"
    }else{
        error.cat_id = ""   
    }

    if(values.image === ""){
        error.image = "Selecione a Imagem !"
    }else{
        error.image = ""   
    }

     if(values.salario === ""){
        error.salario= "Salario não pode ser vazio !"
      }else if(!salario_pattern.test(values.salario)){
        error.salario = 'Salario não corresponde !'
      }else{
        error.salario = '' 
      }
      
      
 
  

 
 

    return error;
    }
    
    export default validation; 