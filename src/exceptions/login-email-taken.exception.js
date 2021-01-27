class LoginEmailTakenException extends Error {
    constructor(message) {
        super(message || "Login or email already taken!");
        this.status = 409;
    }
}
module.exports = LoginEmailTakenException;