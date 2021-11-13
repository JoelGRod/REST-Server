import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, "Status is Required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is Required"]
    }
});

export default model("Category", CategorySchema);