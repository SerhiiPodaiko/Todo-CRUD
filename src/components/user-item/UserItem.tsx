import React, {FC, useState} from "react"
import styled from "styled-components"
import {useAppDispatch} from "../../hooks/useRedux"
import {User} from "../../store/types/todoTypes"
import Btn from "../../ui/button/Button"
import {fetchDeleteUser} from "../../store/slices/todoSlice"
import EditUser from "../edit-user/EditUser"
import Modal from "../../ui/modal/Modal"

interface UserItemProps {
    user: User
}

const StyledListItem = styled.li`
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #333;
        margin-bottom: 8px;
        display: grid;
        grid-template-columns: repeat(5, 1fr) 0.5fr;
        transition: .3s ease-in;
        
        &:hover {
            background: #7364EB;
            color: #fff;
        }
       
    `

const StyledListItemSpan = styled.span`
        display: flex;
    `

const StyledButtonWrap = styled.div`
        display: flex;
        gap: 15px;
    `

const UserItem: FC<UserItemProps> = ({user}) => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    return (
        <>
            <StyledListItem>
                <Modal open={open} onClose={() => setOpen(false)} title="Edit user">
                    <EditUser user={user} />
                </Modal>

                <StyledListItemSpan>{user.name}</StyledListItemSpan>
                <StyledListItemSpan>{user.username}</StyledListItemSpan>
                <StyledListItemSpan>
                    {`${user.email.length > 15 ? `${user.email.slice(0, 15)}..` : user.email}`}
                </StyledListItemSpan>
                <StyledListItemSpan>
                    {`${user.phone.length > 10 ? `${user.phone.slice(0, 10)}..` : user.phone}`}
                </StyledListItemSpan>
                <StyledListItemSpan>
                    {`${user.website.length > 10 ? `${user.website.slice(0, 10)}..` : user.website}`}
                </StyledListItemSpan>
                <StyledButtonWrap>
                    <Btn color={true} onClick={() => setOpen(true)}>Edit</Btn>
                    <Btn color={false} onClick={() => dispatch(fetchDeleteUser(user.id))}>
                        Delete
                    </Btn>
                </StyledButtonWrap>
            </StyledListItem>
        </>
    )
}

export default UserItem
