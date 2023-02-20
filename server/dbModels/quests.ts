import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    title: String,
    description: String,
    categories: [String],
    reward: Number,
    active: Boolean,
    status: String,
  },
  { timestamps: true, strict: true, strictQuery: true },
);

export default mongoose.model("Quest", schema, "quests");
