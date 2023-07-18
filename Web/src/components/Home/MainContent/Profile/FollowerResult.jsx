import React from 'react'
import { useOutletContext } from 'react-router-dom'
import UsersResult from './UsersResult'

const FollowerResult = () => {
    const [user, loggedUser, setLoggedUser] = useOutletContext()

    return (
        <UsersResult users = {user.followers} userState = {[loggedUser, setLoggedUser]}/>
    )
}
export default FollowerResult