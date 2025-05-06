import { createSlice, configureStore } from "@reduxjs/toolkit"

const nums = [0, 1, 2]

const silce = createSlice(
    {
        name: "mainSilce",
        initialState: {
            nums
        },
        reducers: {
            add: (state, action) => {
                let { index, value } = action.payload
                state.nums.splice(index, 0, value)
            },
            remove: (state, action) => {
                let { index } = action.payload
                state.nums.splice(index, 1)
            }
        }
    }
)

export const { add, remove } = silce.actions

export const store = configureStore({
    reducer: silce.reducer
})

