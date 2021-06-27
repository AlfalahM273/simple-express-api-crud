
class CustomError extends Error {
    constructor(responseMsg) {
        super(responseMsg);
        this.status = 500;
    }
}

class NotFoundError extends CustomError {
    constructor(responseMsg) {
        super(responseMsg);
        this.status = 404;
    }
}

class ValidationError extends CustomError {
    constructor(responseMsg) {
        super(responseMsg);
        this.status = 422;
    }
}

module.exports = {
    CustomError,
    NotFoundError,
    ValidationError
};