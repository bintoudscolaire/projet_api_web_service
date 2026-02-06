import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 5000
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      default: null
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      default: null
    }
  },
  { timestamps: true }
);

// Un thread DOIT être lié soit à un groupe soit à un event (pas les deux)
threadSchema.pre('validate', function (next) {
  if (!this.group && !this.event) {
    next(new Error('Un thread doit être lié à un groupe ou à un event'));
  } else if (this.group && this.event) {
    next(new Error('Un thread ne peut pas être lié à un groupe ET un event'));
  } else {
    next();
  }
});

threadSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Thread = mongoose.model('Thread', threadSchema);
export default Thread;
