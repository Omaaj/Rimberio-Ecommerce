import { useSelector } from 'react-redux'
import { selectIsLoggedInUser } from '../../../redux/slice/authSlice'

export function ShowLogin({children}) {
    const isloggedIn = useSelector(selectIsLoggedInUser)

    if(isloggedIn) {
        return children
    }
    return null
}

export function ShowLogout({children}) {
    const isloggedIn = useSelector(selectIsLoggedInUser)

    if(!isloggedIn) {
        return children
    }
    return null
}
