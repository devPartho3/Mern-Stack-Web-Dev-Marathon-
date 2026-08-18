function fetchpostdata() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Post data fetched!")
        }), 5000
    })
}

function fetchcommentdata() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Comment data fetched!")
        }), 3000
    })
}

async function getblogdata() {
    try {
        console.log("Fetching blog data");
        let blogdata=await fetchpostdata()
        let commentdata=await fetchcommentdata()
        console.log(blogdata)
        console.log(commentdata)        
        console.log("Fetch Complete!")
        
    } catch (error) {
        console.error("Error fetching blog data");
    };
}
getblogdata()
