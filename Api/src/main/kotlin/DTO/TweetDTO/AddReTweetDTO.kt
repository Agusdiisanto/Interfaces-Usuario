package twitter.model.DTO.TweetDTO

class AddReTweetDTO() {

    lateinit var content: String
    constructor(content: String) : this() {
        this.content = content
    }

}
