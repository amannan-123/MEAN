import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

itemSchema.index({ name: "text" });

const Item = mongoose.model("Item", itemSchema);

export default Item;
