import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },

    description: {
      type: String,
      default: '',
      maxlength: 5000
    },

    icon: {
      type: String,
      default: ''
    },

    coverImage: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      enum: ['public', 'private', 'secret'],
      default: 'public'
    },

    allowPosts: {
      type: Boolean,
      default: true
    },

    allowEvents: {
      type: Boolean,
      default: true
    },

    // IMPORTANT : PAS de required:true ici
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

groupSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
