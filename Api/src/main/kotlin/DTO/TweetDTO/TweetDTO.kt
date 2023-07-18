package twitter.model.DTO.TweetDTO

import twitter.model.DTO.UsuarioDTO.SimpleUserDTO

class TweetDTO( val id : String ,            val type : TwitterTypeDTO     ,
                val user : SimpleUserDTO ,   val content : String          ,
                val date : String ,          val replies : MutableList<SimpleTweetDTO>  ,
                val reTweet: MutableList<SimpleTweetDTO>, val likes : MutableList<SimpleUserDTO>){






}