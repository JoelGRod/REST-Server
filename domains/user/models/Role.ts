import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "Role is Required"]
    }
});

export default model("Role", RoleSchema);