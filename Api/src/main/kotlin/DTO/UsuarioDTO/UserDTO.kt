package twitter.model.DTO.UsuarioDTO

import twitter.model.DTO.TweetDTO.SimpleTweetDTO

class UserDTO(
    val id: String,
    val username: String,
    val email: String,
    val image: String,
    val backgroundImage: String,
    val followers: MutableList<SimpleUserDTO>,
    val followings: MutableList<SimpleUserDTO>,
    val tweets: MutableList<SimpleTweetDTO>
) {
}