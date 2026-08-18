import Apiresponse from '../utils/apiresponse.js';


const healthcheck = async(req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "Healthcheck successful"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Healthcheck failed",
            error: error.message
        });
    }   
    const response = new Apiresponse(200, true, "Healthcheck successful", null);
    res.status(response.statuscode).json(response);
};

export default (healthcheck);
