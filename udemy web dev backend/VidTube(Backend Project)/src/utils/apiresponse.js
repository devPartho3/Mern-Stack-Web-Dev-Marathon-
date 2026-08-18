class Apiresponse {
    constructor(statuscode, success, message, data) {
        this.statuscode = statuscode<400 ? 200 : statuscode;
        this.success = success;
        this.message = message;
        this.data = data;
    }   
}

export default Apiresponse;