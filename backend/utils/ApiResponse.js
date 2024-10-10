class ApiResponse{
    constructor(statusCode, data, message = "success"){
        this.message = message
        this.statusCode = statusCode
        this.data = data
    }
}

export {ApiResponse}