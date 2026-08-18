class Apierror extends Error {
    constructor(statuscode, message, errors) {
        super("Something went wrong");
        this.statuscode = statuscode;
        this.message = message;
        this.stack = this.stack;
        this.data = null;
        this.success = false;
        this.errors=errors
    }
}

export default Apierror;