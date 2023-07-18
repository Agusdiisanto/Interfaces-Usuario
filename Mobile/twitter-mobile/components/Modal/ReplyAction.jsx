import Api from '../../service/Api'


const actionName = "Reply"
const inputs = [{ field: 'content', placeholder: 'Tweet your reply' },
                    { field: 'image', placeholder: 'Add an Image (Optional)' }]

const executeAction = (id, body) => {

    return new Promise((resolve, reject) => {
        Api.reply(id, body)
            .then((response)=> {
                const url = `Tweet/${id}`
                resolve(url)
            })
            .catch((error) => {
                reject(error);
            })
    })   
}

const ReplyAction = {
    actionName,
    inputs,
    executeAction
}

export default ReplyAction