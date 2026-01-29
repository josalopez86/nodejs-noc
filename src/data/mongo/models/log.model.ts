import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    level:{
        type: String,
        enum: ["low", "high", "medium"],
        default: "low"
    },
    message: {
        type: String, 
        require: true
    },
    origin: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const LogModel = mongoose.model("Log", logSchema);