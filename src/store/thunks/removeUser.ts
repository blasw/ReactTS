import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUserThunk = createAsyncThunk('users/remove', async (id: number) => {
    await axios.delete(`http://localhost:3005/users/${id}`);

    return id;
});

export { removeUserThunk };