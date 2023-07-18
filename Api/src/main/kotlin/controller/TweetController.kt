package twitter.model.controller

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.validation.ValidationException
import org.unq.*
import twitter.model.DTO.DTOMapper
import twitter.model.DTO.ErrorDTO.ErrorDTO
import twitter.model.DTO.ErrorDTO.ErrorDTOMapper
import twitter.model.DTO.TweetDTO.AddReTweetDTO
import twitter.model.DTO.TweetDTO.AddReplyTweetDTO
import twitter.model.DTO.TweetDTO.AddTweetDTO
import twitter.model.DTO.TweetDTO.TweetsResultDTO


class  TweetController() {

    private lateinit var system : TwitterSystem
    private lateinit var mapper: DTOMapper
    private lateinit var errorDTOMapper: ErrorDTOMapper

    constructor(system : TwitterSystem) : this() {
        this.system = system
        this.mapper = DTOMapper(system)
        this.errorDTOMapper = ErrorDTOMapper()
    }

    fun search(ctx: Context) {
        try{
            val text = ctx.queryParam("text")
            val result = system.search(text!!)
            val dtoResult = TweetsResultDTO(result.map{mapper.mapTweetToSimpleTweetDTO(it)}.toMutableList())
            ctx.json(dtoResult)
        }catch (e: NullPointerException){
            ctx.json(ErrorDTO("Bad query request"))
            ctx.status(400)
        }
    }

    fun trendingTopics(ctx : Context){
        val result = system.getTrendingTopics()
        val dtoResult = TweetsResultDTO(result.map{mapper.mapTweetToSimpleTweetDTO(it)}.toMutableList())
        ctx.json(dtoResult)
    }

    fun addTweet(ctx : Context) {
        try {
            val newTweet = ctx.bodyValidator(AddTweetDTO::class.java)
                .check({ it.content.isNotBlank() }, "Content cannot be empty")
                .get()
            val user = ctx.attribute<User>("user")
            val draft = DraftTweet(user!!.id, newTweet.content, newTweet.image)
            val dto = mapper.mapTweetToTweetDTO(system.addNewTweet(draft))
            ctx.json(dto)

        } catch (e: UninitializedPropertyAccessException) {
            ctx.json(ErrorDTO("Bad Body Request"))
            ctx.status(400)
        } catch (e: ValidationException) {
            ctx.json(ErrorDTO("Content cannot be empty"))
            ctx.status(400)
        }
    }

    fun getTweetByID(ctx : Context){
        val tweetID = ctx.pathParam("id")
        try{
            val dto = mapper.mapTweetToTweetDTO(system.getTweet(tweetID))
            ctx.json(dto)
        } catch (e: TweetException){
            ctx.status(400)
            ctx.json(ErrorDTO(e.message!!))
        }

    }

    fun like(ctx: Context){
        try{
            val tweetID = ctx.pathParam("id")
            val user = ctx.attribute<User>("user")
            val result = system.toggleLike(tweetID, user!!.id)
            val dtoTweet = mapper.mapTweetToTweetDTO(result)
            ctx.json(dtoTweet)
        }catch (e : TweetException){
            ctx.status(400)
            ctx.json(ErrorDTO(e.message!!))
        }
    }

    fun retweet(ctx: Context){
        try{
            val tweetID = ctx.pathParam("id")
            val user = ctx.attribute<User>("user")
            val retweet = ctx.bodyValidator(AddReTweetDTO::class.java)
                .check({it.content.isNotBlank()}, "Content cannot be empty")
                .get()
            val draft = DraftReTweet(user!!.id, tweetID, retweet.content)
            val tweet = system.addReTweet(draft)
            val dto = mapper.mapTweetToTweetDTO(tweet)
            ctx.json(dto)

        }catch (e : TweetException){
            ctx.status(400)
            ctx.json(ErrorDTO(e.message!!))

        }catch (e: ValidationException){
            ctx.json(ErrorDTO("Content cannot be empty"))
            ctx.status(400)

        }catch (e: UninitializedPropertyAccessException){
            ctx.json(ErrorDTO("Bad Body Request"))
            ctx.status(400)
        }
    }

    fun replay(ctx: Context){
        try{
            val tweetID = ctx.pathParam("id")
            val user = ctx.attribute<User>("user")
            val reply = ctx.bodyValidator(AddReplyTweetDTO::class.java)
                .check({it.content.isNotBlank()}, "Content cannot be empty")
                .get()
            val draft = DraftReplyTweet(user!!.id, tweetID, reply.content, reply.image)
            val dto = mapper.mapTweetToTweetDTO(system.replyTweet(draft))
            ctx.json(dto)

        }catch (e: TweetException){
            ctx.status(400)
            ctx.json(ErrorDTO(e.message!!))
        }catch (e: UninitializedPropertyAccessException){
            ctx.json(ErrorDTO("Bad Body Request"))
            ctx.status(400)
        }catch (e: ValidationException){
            ctx.json(ErrorDTO("Content cannot be empty"))
            ctx.status(400)

        }
    }
}