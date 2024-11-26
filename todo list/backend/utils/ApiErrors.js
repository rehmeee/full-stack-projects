class ApiErrors extends Error {
    constructor(status, message="something went wrong", stack) {
        super(message)
        this.status = status,
        this.stack = stack

    }
}
export {ApiErrors}