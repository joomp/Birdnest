import mongoose from 'mongoose';

// Expiration time for document in seconds
const TTL = 600;

const infractionSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  positionY: {
    type: Number,
    required: true,
  },
  positionX: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  snapshotTimestamp: {
    type: Date,
    required: true,
  },
  lastModified: {type: Date, expires: TTL, default: Date.now},
});

infractionSchema.set('toJSON', {
  /**
   * Convert Infraction MongoDB document to JSON string
   *
   * @param document MongoDB document
   * @param returnedObject JSON
   */
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.lastModified;
  },
});

const Infraction = mongoose.model('Infraction', infractionSchema);
export default Infraction;
