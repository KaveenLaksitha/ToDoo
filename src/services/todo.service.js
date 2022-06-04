import API from "./API";

export const addToDo = async (payload) => {
    try {
        const res = await API.post("/task", payload)
        if (res.status === 201) {
            return { ok: true }
        } else {
            return { ok: false }
        }
    } catch (err) {
        console.log("err>>", err)
        return { ok: false }
    }
}

export const getAllTodos = async () => {
    try {
        const res = await API.get("/task")
        if (res.status === 200) {
            return { ok: true, data: res?.data?.data }
        } else {
            return { ok: false }
        }
    } catch (err) {
        console.log("err while getting data>>", err)
        return { ok: false }
    }
}

export const updateSingleToDo = async (id, payload) => {
    try {
        const res = await API.put(`/task/${id}`, payload)
        if (res.status === 200) {
            return { ok: true, data: res?.data?.data }
        } else {
            console.log(res)
            return { ok: false }
        }
    } catch (err) {
        console.log("err>>", err)
        return { ok: false }
    }
}

export const deleteSingleToDo = async (id) => {
    try {
        const res = await API.delete(`/task/${id}`)
        console.log("res>>>", res.data, res.status)
        if (res.status === 200) {
            return { ok: true, data: res?.data?.data }
        } else {
            console.log(res)
            return { ok: false }
        }
    } catch (err) {
        console.log("err>>", err)
        return { ok: false }
    }
}

