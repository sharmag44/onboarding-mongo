const validator = require('validator')

String.prototype.toObjectId = function () {
    let ObjectId = (require('mongoose').Types.ObjectId)
    return new ObjectId(this.toString())
}

// eslint-disable-next-line no-extend-native
String.prototype.isObjectId = function () {
    return validator.isMongoId(this)
}

String.prototype.isEmail = function () {
    return validator.isEmail(this)
}

String.prototype.isPhone = function () {
    let code = this

    return code.match(/^\d{10}$/) ||
        code.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ||
        code.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
}

String.prototype.isMobile = function () {
    let code = this

    return code.match(/^\d{10}$/) ||
        code.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ||
        code.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
}