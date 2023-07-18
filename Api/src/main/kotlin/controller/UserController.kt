package twitter.model.controller

import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.bodyValidator
import io.javalin.validation.ValidationException
import org.unq.DraftUser
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import twitter.model.DTO.DTOMapper
import twitter.model.DTO.ErrorDTO.ErrorDTO
import twitter.model.DTO.ErrorDTO.ErrorDTOMapper
import twitter.model.DTO.TweetDTO.TweetsResultDTO
import twitter.model.DTO.UsuarioDTO.DraftUserDTO
import twitter.model.DTO.UsuarioDTO.UserLoginDTO
import twitter.model.DTO.UsuarioDTO.UsersResultDTO
import twitter.model.auth.TokenService


class UserController() {

    private lateinit var system : TwitterSystem
    private lateinit var mapper: DTOMapper
    private lateinit var token : TokenService
    private lateinit var errorDTOMapper: ErrorDTOMapper
    constructor(system : TwitterSystem) : this() {
        this.system = system
        this.mapper = DTOMapper(system)
        this.token  = TokenService(system)
        this.errorDTOMapper = ErrorDTOMapper()
    }

    fun login(ctx: Context) {
        try {
            val userLogin = ctx.bodyValidator(UserLoginDTO::class.java)
                .check({ it.username.isNotBlank() }, "Username cannot be empty")
                .check({ it.password.isNotBlank() }, "Password cannot be empty")
                .getOrThrow {throw BadRequestResponse()}
            val user = getLoginUser(userLogin)
            val userDTO = mapper.mapUserToUserDTO(user)
            val tokenUser = token.userToToken(user)
            ctx.header(token.header, tokenUser)
            ctx.json(userDTO)
        } catch (e: NotFoundResponse) {
            ctx.json(ErrorDTO(e.message!!))
            ctx.status(404)
        }catch (e: BadRequestResponse) {
            ctx.json(ErrorDTO("All fields are required"))
            ctx.status(400)
        }catch (e: UninitializedPropertyAccessException){
            ctx.json(ErrorDTO("Bad Body request"))
            ctx.status(400)
        }
    }


    private fun getLoginUser(userLogin:UserLoginDTO): User {
        val users = system.users
        return users.find { it.username == userLogin.username && it.password == userLogin.password }
            ?: throw NotFoundResponse("Username or password wrong")
    }


    fun createAccount(ctx : Context){

        try {
            val newUser = ctx.bodyValidator(DraftUserDTO::class.java)
                .check({ it.username.isNotBlank() }, "Username cannot be empty")
                .check({ it.email.isNotBlank() }, "Email cannot be empty")
                .check({ it.password.isNotBlank() }, "Password cannot be empty")
                .check({ it.image.isNotBlank() }, "Image cannot be empty")
                .check({ it.backgroundImage.isNotBlank() }, "Image background cannot be empty")
                .getOrThrow { throw BadRequestResponse() }
            val draftUser =
                DraftUser(newUser.username, newUser.email, newUser.password, newUser.image, newUser.backgroundImage)
            val user = system.addNewUser(draftUser)
            val userDTO = mapper.mapUserToUserDTO(user)
            val tokenUser = token.userToToken(user)
            ctx.header(token.header, tokenUser)
            ctx.json(userDTO)
        }catch (e: UninitializedPropertyAccessException){
            ctx.json(ErrorDTO("Bad body request"))
            ctx.status(400)
        } catch (e: UserException) {
            ctx.json(ErrorDTO(e.message!!))
            ctx.status(400)
        } catch (e: BadRequestResponse){
            ctx.json(ErrorDTO("All fields are required"))
            ctx.status(400)
        }

    }

    fun getUser(ctx: Context){
        val user = ctx.attribute<User>("user")
        ctx.json(mapper.mapUserToUserDTO(user!!))
    }

    fun getUserWithId(ctx : Context){
        val usuarioID = (ctx.pathParam("id"))
        try{
            val usuario = mapper.mapUserToUserDTO(system.getUser(usuarioID))
            ctx.json(usuario)

        } catch (e: UserException){
            ctx.status(404)
            ctx.json(ErrorDTO(e.message!!))
        }

    }

    fun followingTweets(ctx : Context){
        val user = ctx.attribute<User>("user")
        val result = system.getFollowingTweets(user!!.id)
        val tweets = result.map{mapper.mapTweetToSimpleTweetDTO(it)}.toMutableList()
        val dtoResult = TweetsResultDTO(tweets)
        ctx.json(dtoResult)
    }

    fun usersToFollow(ctx : Context){
        val user = ctx.attribute<User>("user")
        val result = system.getUsersToFollow(user!!.id)
        val users = result.map{mapper.mapUserToSimpleUserDTO(it)}.toMutableList()
        val dtoResult = UsersResultDTO(users)
        ctx.json(dtoResult)
    }

    fun followUser(ctx : Context){
        try{
            val user = ctx.attribute<User>("user")
            val userToFollow = ctx.pathParam("id")
            val result = system.toggleFollow(user!!.id, userToFollow)
            val dtoUser = mapper.mapUserToUserDTO(result)
            ctx.json(dtoUser)

        }catch (e : UserException){
            ctx.status(404)
            ctx.json(ErrorDTO(e.message!!))
        }
    }

}




