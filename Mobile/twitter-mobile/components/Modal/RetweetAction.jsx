import Api from '../../service/Api'


const actionName = "Retweet"

const inputs = [{field: 'content', placeholder: 'Add a Comment'}]

const executeAction = (id, body) => {
    return new Promise((resolve, reject) => {

        Api.retweet(id, body)
            .then((response) => {
            const newTweet = response.data.reTweet.at(-1);
            url = (`Tweet/${newTweet.id}`)
            resolve(url)
            })
            .catch((error) => {
                reject(error)
            });
    })
}

const RetweetAction = {
    actionName,
    inputs,
    executeAction
}

export default RetweetAction