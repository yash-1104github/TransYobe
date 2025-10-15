import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { _id: false } // no need for an _id in each message
);

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references User model
      required: true,
      unique: true, // ensures one chat document per user
    },
    messages: {
      type: [messageSchema], // array of question/response pairs
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
