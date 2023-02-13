import {useEffect, useState} from "react"
import styled from "styled-components"
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux"
import {fetchGetAllUsers} from "../../store/slices/todoSlice"
import UserItem from "../user-item/UserItem"
import {StyledContainer} from "../../index"
import AddUser from "../add-user/AddUser"
import Alert from "../../ui/alert/Alert"
import Preloader from "../../ui/preloader/Preloader"
import Btn from "../../ui/button/Button"
import Modal from "../../ui/modal/Modal"

const StyledList = styled.ul`
        margin-top: 40px;
        list-style: none;
        display: flex;
        flex-direction: column;
    `

const StyledListItemHead = styled.li`
        padding: 15px;
        color: #fff;
        margin-bottom: 8px;
        background: #9457EB;
        display: grid;
        grid-template-columns: repeat(5, 1fr) 0.5fr;
        border-radius: 8px;
    `

const UserList = () => {
    const [open, setOpen] = useState<boolean>(false)

    const {users, loading, error} = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGetAllUsers())
    }, [dispatch])

    return (
        <StyledContainer style={{padding: 20}}>
            <Modal open={open} onClose={() => setOpen(false)} title="Add user">
                <AddUser setOpen={() => setOpen(false)}/>
            </Modal>
            <Btn color={true} onClick={() => setOpen(true)}>
                Add user
            </Btn>

            <StyledList>
                <StyledListItemHead>
                    <span>Name</span>
                    <span>Username</span>
                    <span>E-mail</span>
                    <span>Phone</span>
                    <span>website</span>
                </StyledListItemHead>

                {error && <Alert type="error">{error}</Alert>}

                {!users?.length && <Alert type="error">The list is empty</Alert>}
                {loading ? <Preloader/> :
                    users?.map(user =>
                        <UserItem key={user.name} user={user}/>)}

            </StyledList>
        </StyledContainer>
    )
}

export default UserList
