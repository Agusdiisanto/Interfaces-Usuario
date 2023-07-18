import React  from 'react'
import { useOutletContext } from 'react-router-dom'
import UsersResult from './UsersResult'

const FollowingResult = () => {

    const [user, loggedUser, setLoggedUser] = useOutletContext()

    return (
        <UsersResult users = {user.followings} userState = {[loggedUser, setLoggedUser]} />
    )
}
export default FollowingResult