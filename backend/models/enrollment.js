const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
    listingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    memberIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    }]
})

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema)

module.exports = {
    Enrollment
}