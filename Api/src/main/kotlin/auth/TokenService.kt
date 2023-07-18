package twitter.model.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.*
import io.javalin.security.RouteRole
import javalinjwt.JWTProvider
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException

class TokenService(private val service: TwitterSystem) {
    private val algorithm = Algorithm.HMAC256("very_secret")
    private val verifier = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    private val provider = JWTProvider(algorithm, generator, verifier)
    val header = "Authorization"

    fun userToToken(user: User): String {
        return provider.generateToken(user)
    }

    fun validate(handler: Handler, ctx: Context, permittedRoles: Set<RouteRole>) {
        val header = ctx.header(header)
        when {
            permittedRoles.contains(Roles.ANYONE) -> {
                handler.handle(ctx)
            }
            header == null -> {
                throw UnauthorizedResponse("Invalid token")
            }
            permittedRoles.contains(Roles.USER) -> {
                val token = provider.validateToken(header)
                if (token.isPresent) {
                    val userId = token.get().getClaim("id").asString()
                    try {
                        val user = service.getUser(userId)
                        ctx.attribute("user", user)
                        if (permittedRoles.contains(Roles.USER)) {
                            handler.handle(ctx)
                        }
                    } catch (e:UserException){
                        throw UnauthorizedResponse("Invalid token")
                    }
                } else {
                    throw UnauthorizedResponse("Invalid token")
                }
            }
            else -> {throw InternalServerErrorResponse("No tiene rol asignado")}
        }
    }
}