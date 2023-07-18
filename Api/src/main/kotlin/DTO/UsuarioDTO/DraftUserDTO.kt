package twitter.model.DTO.UsuarioDTO

class DraftUserDTO(){

    lateinit var username : String
    lateinit var email : String
    lateinit var password : String
    lateinit var image : String
    lateinit var backgroundImage : String

    constructor(username : String , email : String, password : String , image : String , backgroundImage : String) : this(){
        this.username = username
        this.email = email
        this.password = password
        this.image = image
        this.backgroundImage = backgroundImage
    }

}
