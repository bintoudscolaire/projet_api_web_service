import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
      required: true
    }
  },
  { timestamps: true }
);

messageSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
