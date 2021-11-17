import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
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
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is Required"]
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, status, ...product } = this.toObject();
    return { id: _id, ...product }; 
}

export default model("Product", ProductSchema);