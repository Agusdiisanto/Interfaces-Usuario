package twitter.model.DTO.UsuarioDTO


class UserLoginDTO() {

    lateinit var username : String
    lateinit var password : String

    constructor(username : String , password : String) : this(){
        this.username = username
        this.password = password
    }

}