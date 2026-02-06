import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        text: String,
        votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
      }
    ],
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

pollSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Poll', pollSchema);
