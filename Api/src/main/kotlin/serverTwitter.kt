 package twitter.model

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import org.unq.initTwitterSystem
import twitter.model.auth.Roles
import twitter.model.auth.TokenService
import twitter.model.controller.TweetController
import twitter.model.controller.UserController

fun main()  {
    val twitterSystem = initTwitterSystem()
    val userController = UserController(twitterSystem)
    val tweetController = TweetController(twitterSystem)
    val tokenService = TokenService(twitterSystem)

    val app = Javalin.create {
        it.http.defaultContentType = "application/json"
        it.accessManager(tokenService :: validate)
        it.plugins.enableCors{
            it.add{
                it.allowHost("http://localhost:5173/")
                it.exposeHeader("Authorization")
            }
        }
    }.start(8080)

    app.routes {

        path("login"){
            post(userController :: login, Roles.ANYONE)
        }

        path("register"){
            post(userController :: createAccount, Roles.ANYONE)
        }

        path("user"){
            get(userController :: getUser, Roles.USER)

            path("followingTweets"){
                get(userController :: followingTweets, Roles.USER)
            }

            path("usersToFollow"){
                get(userController :: usersToFollow, Roles.USER)
            }

            path("{id}"){
                get(userController :: getUserWithId, Roles.USER)
                path("follow"){
                    put(userController :: followUser , Roles.USER)
                }
            }

        }
        path("search"){
            get(tweetController :: search, Roles.USER)
        }
        path("trendingTopics"){
            get(tweetController :: trendingTopics, Roles.USER)
        }
        path("tweet"){
            post(tweetController :: addTweet, Roles.USER)
            path("{id}"){
                get(tweetController :: getTweetByID, Roles.USER)
                path("like"){
                    put(tweetController :: like, Roles.USER)
                }
                path("retweet"){
                    post(tweetController :: retweet, Roles.USER)
                }
                path("replay"){
                    post(tweetController :: replay, Roles.USER )
                }
            }
        }
    }
}