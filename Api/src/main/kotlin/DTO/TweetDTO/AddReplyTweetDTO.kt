package twitter.model.DTO.TweetDTO

class AddReplyTweetDTO() {

    lateinit var content: String
    var image: String? = null

    constructor(content: String, image: String?) : this(){
        this.content = content
        this.image = image!!
    }

}
