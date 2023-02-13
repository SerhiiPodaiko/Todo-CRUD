import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User} from "../types/todoTypes"
import axios from "axios"

export const fetchGetAllUsers = createAsyncThunk<User[], undefined, {rejectValue: string}>(
    "users/fetchGetAllUsers",
     async function (_, {rejectWithValue}) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?_limit=3`)
            const body = await response.data

            return body
        } catch (e: any) {
            rejectWithValue(e.message)
        }
    }
)

export const fetchAddUser = createAsyncThunk<any, any, {rejectValue: string}>(
    "users/fetchAddUser",
    async function ({id, email, name, username, phone, website}, {rejectWithValue}) {

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, email, name, username, phone, website})
        })

        if (response.status !== 201) {
            return rejectWithValue("Can`t delete user. Server Error")
        }

        return await JSON.parse(response.data.body)
    }
)

export const fetchDeleteUser = createAsyncThunk<number, number, {rejectValue: string}>(
    "users/fetchDeleteUser",
    async function (id, {rejectWithValue}) {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${id}`)

            if (response.status !== 200) {
              return rejectWithValue("Can`t delete user. Server Error")
            }

            return id
    }
)

export const fetchEditUser = createAsyncThunk<any, any, {rejectValue: string}>(
    "users/fetchEditUser",
    async function ({id, email, name, username, phone, website}, {rejectWithValue}) {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, email, name, username, phone, website})
        })

        return await JSON.parse(response.data.body)
    }
)

type TodosState = {
    users: User[],
    loading: boolean,
    error: any,
    user: object
}

const initialState: TodosState = {
    users: [],
    loading: false,
    error: null,
    user: {}
}

const todoSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Set users
        builder
            .addCase(fetchGetAllUsers.pending, (state) => {
                state.loading = true
                state.error = null
            });
        builder
            .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
            });
        builder
            .addCase(fetchGetAllUsers.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
        // Add user
        builder
            .addCase(fetchAddUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
        builder
            .addCase(fetchAddUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.users.unshift(action.payload)
                state.loading = false
            })
        builder
            .addCase(fetchAddUser.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.loading = false
            })
        // Delete user
        builder
            .addCase(fetchDeleteUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.users = state.users.filter((user: any) => user.id !== action.payload)
            })
        // Edit user
        builder
            .addCase(fetchEditUser.fulfilled, (state, action: PayloadAction<any>) => {
                const {id, name, username, phone, email, website} = action.payload
                const existingUser = state.users.find(user => user.id === id)

                if (existingUser) {
                    existingUser.name = name
                    existingUser.username = username
                    existingUser.phone = phone
                    existingUser.email = email
                    existingUser.website = website
                }
            })
    }
})

export default todoSlice.reducer
