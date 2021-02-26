export const readLocal = (key) => {
    return new Promise((resolve, reject) => {
        let value = JSON.parse(localStorage.getItem(key))
        resolve(value)
    })
}

export const removeLocal = (key) => {
    localStorage.removeItem(key)
}