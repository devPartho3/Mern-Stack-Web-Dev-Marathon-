function fetchuserdata() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "ChaiCode", URL: "https://chaicode.com" })
        }, 5000)
    })
}

async function getuserdata() {
    try {
        console.log("Fetching User Data!....");
        let userdata=await fetchuserdata()
        console.log("User Data:",userdata);
        console.log("USer Data Featched Successfully!!!")
        
    } catch (error) {
        console.log("Error Fetching Data",error)
    }
}

getuserdata()