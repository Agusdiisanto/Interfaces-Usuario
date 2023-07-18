package twitter.model.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import javalinjwt.JWTGenerator
import org.unq.User

class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, algo: Algorithm?): String {
        val token: JWTCreator.Builder = JWT.create().withClaim("id", user.id)
        return token.sign(algo)
    }
}