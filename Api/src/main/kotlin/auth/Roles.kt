package twitter.model.auth

import io.javalin.security.RouteRole

enum class Roles : RouteRole {
    ANYONE, USER
}