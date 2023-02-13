import {ChangeEvent, FC, FormEvent, useRef, useState} from "react"
import styled from "styled-components"
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux"
import Alert from "../../ui/alert/Alert"
import Btn from "../../ui/button/Button"
import {fetchAddUser, fetchEditUser} from "../../store/slices/todoSlice"

interface EditUserProps {
    user: any
}

const StyledForm = styled.form`
        color: #fff;
        text-align: center;
    `

const StyledFormInput = styled.input`
        width: 100%;
        margin-bottom: 15px;
        padding: 12px;
        color: #EB6A5E;
        font-size: 18px;
        border: none;
        border: 1.5px solid #9457EB;
        outline: none;
        color: #9457EB;
        cursor: pointer;
        border-radius: 8px;
        
        &::placeholder {
            font-size: 14px;
            color: #9457EB;
        }
    `

const StyledWrapperBtn = styled.div`
       display: flex;
       justify-content: flex-end;
    `

const EditUser: FC<EditUserProps> = ({user}) => {
    const {users} = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const [validateError, setValidateError] = useState<boolean>(false)

    const existingUser = users.filter(item => item.id === user.id)
    const {name, username, email, phone, id, website} = existingUser[0]

    const [form, setForm] = useState({
        name,
        username,
        email,
        phone,
        website,
    })

    const validateForm = () => {
        if (!form.name.length || !form.username.length || !form.email.length ||
            !form.phone.length || !form.website.length) {

            setValidateError(true)
            return
        } else {
            setValidateError(false)
            dispatch(fetchEditUser({
                name: form.name,
                username: form.username,
                email: form.email,
                phone: form.phone,
                website: form.website,
                id: id
            }))
        }
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const updateUser = () => {
        validateForm()
    }

    return (
        <StyledForm onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <StyledFormInput
                type="text"
                name="name"
                required
                value={form.name}
                onChange={onChangeInput}
                placeholder="Name"/>
            <StyledFormInput
                type="text"
                name="username"
                value={form.username}
                onChange={onChangeInput}
                placeholder="Last name"/>
            <StyledFormInput
                type="text"
                name="phone"
                required
                value={form.phone}
                onChange={onChangeInput}
                placeholder="Phone"/>
            <StyledFormInput
                type="text"
                name="email"
                required
                value={form.email}
                onChange={onChangeInput}
                placeholder="Email"/>
            <StyledFormInput
                type="url"
                name="website"
                required
                value={form.website}
                onChange={onChangeInput}
                placeholder="Website"/>

            {validateError && <Alert type="error">Invalid: Try again!</Alert>}

            <StyledWrapperBtn onClick={(e) => e.stopPropagation()}>
                <Btn color={true} onClick={updateUser}>
                    Edit user
                </Btn>
            </StyledWrapperBtn>
        </StyledForm>
    )
}

export default EditUser
