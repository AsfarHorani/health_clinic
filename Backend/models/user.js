const db = require('../util/database')
 class User {
constructor(email,password,type,status=false){
    this.email = email;
    this.password = password;
    this.type = type;
    this.status = status;
}


save(){
  
    return db.excecute('INSERT INTO users (email, password,type,status) valuse(?,?,?,?)',
    [this.email,this.password,this.type,this.status])

}
    
}

module.exports = User;


