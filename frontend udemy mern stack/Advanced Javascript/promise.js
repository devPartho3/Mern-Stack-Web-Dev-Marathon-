function fetchdata() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true
            if (success) {
                resolve("Data Fetched!")
            }
            else {
                reject("Fetching Error!")
            }
        },5000)
    })
}
fetchdata()
.then((data)=>console.log(data))
.catch((error)=>console.error(error))
// console.log(response)
