import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    description: { type: String, default: '', maxlength: 5000 },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    location: { type: String, required: true, trim: true, maxlength: 255 },
    coverImage: { type: String, default: '' },
    isPublic: { type: Boolean, default: true },

    // Lien vers un groupe (optionnel)
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      default: null
    },

    organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
  },
  { timestamps: true }
);

eventSchema.pre('validate', function (next) {
  if (this.dateEnd < this.dateStart) {
    next(new Error('dateEnd doit être après dateStart'));
  } else {
    next();
  }
});

eventSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
