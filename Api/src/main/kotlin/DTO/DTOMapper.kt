package twitter.model.DTO

import twitter.model.DTO.TweetDTO.SimpleTweetDTO
import twitter.model.DTO.TweetDTO.TweetDTO
import twitter.model.DTO.TweetDTO.TwitterTypeDTO
import org.unq.Tweet
import org.unq.TweetType
import org.unq.TwitterSystem
import org.unq.User
import twitter.model.DTO.TweetDTO.ParentTweetDTO
import twitter.model.DTO.UsuarioDTO.SimpleUserDTO
import twitter.model.DTO.UsuarioDTO.UserDTO

class DTOMapper() {

    lateinit var system : TwitterSystem

    constructor(system : TwitterSystem) : this() {
        this.system = system
    }

    fun mapUserToUserDTO(user: User): UserDTO {
        val tweets = this.system.tweets
        val followers = user.followers.map { mapUserToSimpleUserDTO(it) }
        val following = user.following.map { mapUserToSimpleUserDTO(it) }
        val userTweets = tweets.filter { t -> t.user.id == user.id }
        val tweetsDTO = userTweets.map {mapTweetToSimpleTweetDTO(it)}
        return UserDTO(
            user.id,
            user.username,
            user.email,
            user.image,
            user.backgroundImage,
            followers.toMutableList(),
            following.toMutableList(),
            tweetsDTO.toMutableList()
        )
    }

    fun mapUserToSimpleUserDTO(user: User): SimpleUserDTO {
        return SimpleUserDTO(
            user.id, user.username, user.image
        )
    }

    fun mapTweetToSimpleTweetDTO(tweet: Tweet): SimpleTweetDTO {
        val user = mapUserToSimpleUserDTO(tweet.user)
        val likes = tweet.likes.map { mapUserToSimpleUserDTO(it) }
        val type = mapTweetTypeToTwitterTypeDTO(tweet.type)
        return SimpleTweetDTO(
            tweet.id,
            type,
            user,
            tweet.content,
            tweet.date.toString(),
            tweet.replies.count(),
            tweet.reTweets.count(),
            likes.toMutableList()
        )
    }

    private fun mapTweetTypeToTwitterTypeDTO(type: TweetType): TwitterTypeDTO {
        var tweetType = "normal"
        when{
            type.isReTweet() -> { tweetType = "retweet" }
            type.isReplayTweet() -> { tweetType = "reply" }
        }
        return TwitterTypeDTO(
            tweetType,
            type.image,
            mapTweetToParentTweetDTO(type.tweet)
        )
    }

    private fun mapTweetToParentTweetDTO(tweet: Tweet?) : ParentTweetDTO? {
        if (tweet != null) {
            return ParentTweetDTO(
                tweet.user.username,
                tweet.user.id,
                tweet.user.image,
                tweet.id,
                tweet.date.toString(),
                tweet.content,
                tweet.type.image
            )
        }
        else return null
    }

    fun mapTweetToTweetDTO(tweet : Tweet) : TweetDTO{
        val user = mapUserToSimpleUserDTO(tweet.user)
        val type = mapTweetTypeToTwitterTypeDTO(tweet.type)
        val replies = tweet.replies.map {mapTweetToSimpleTweetDTO(it)}
        val reTweet = tweet.reTweets.map {mapTweetToSimpleTweetDTO(it)}
        val likes = tweet.likes.map { mapUserToSimpleUserDTO(it) }

        return TweetDTO(
            tweet.id,
            type,
            user,
            tweet.content,
            tweet.date.toString(),
            replies.toMutableList(),
            reTweet.toMutableList(),
            likes.toMutableList()
        )

    }

}