import React, {ChangeEvent, FC, FormEvent, useRef, useState} from "react"
import styled from "styled-components"
import {useAppDispatch} from "../../hooks/useRedux"
import {fetchAddUser} from "../../store/slices/todoSlice"
import Btn from "../../ui/button/Button"
import Alert from "../../ui/alert/Alert"

interface AddUserProps {
    setOpen: any
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

const AddUser: FC<AddUserProps> = ({setOpen}) => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    })

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [validateError, setValidateError] = useState<boolean>(false)

    const validateForm = () => {
        const newUser = {
            email: form.email,
            id: Math.floor(Math.random() * 100), // захардкодив щоб не тягнути uuid
            name: form.name,
            phone: form.phone,
            username: form.username,
            website: form.website
        }

        if (!form.name.length || !form.username.length || !form.email.length ||
            !form.phone.length || !form.website.length) {

            setValidateError(true)
            return
        } else {
            setValidateError(false)
            dispatch(fetchAddUser(newUser))
            setOpen(false)
        }
    }

    const dispatch = useAppDispatch()

    const addTodo = () => {
        validateForm()
    }

    return (
       <StyledForm onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
           <StyledFormInput
               type="text"
               name="name"
               value={form.name}
               onChange={onChangeInput}
               required
               placeholder="Name" />
           <StyledFormInput
               type="text"
               name="username"
               value={form.username}
               onChange={onChangeInput}
               required
               placeholder="Last name" />
           <StyledFormInput
               type="text"
               name="phone"
               value={form.phone}
               onChange={onChangeInput}
               required
               placeholder="Phone" />
           <StyledFormInput
               type="text"
               name="email"
               value={form.email}
               onChange={onChangeInput}
               required
               placeholder="Email" />
           <StyledFormInput
               type="url"
               name="website"
               value={form.website}
               onChange={onChangeInput}
               required
               placeholder="Website" />

           {validateError && <Alert type="error">Invalid: Try again!</Alert>}

           <StyledWrapperBtn onClick={(e) => e.stopPropagation()}>
               <Btn color={true} onClick={addTodo}>
                   Add user
               </Btn>
           </StyledWrapperBtn>
       </StyledForm>
    )
}

export default AddUser
