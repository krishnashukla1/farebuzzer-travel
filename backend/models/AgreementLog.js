// server/models/AgreementLog.js
import mongoose from 'mongoose';

const agreementLogSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true
  },
  customerName: String,
  bookingReference: String,
  ipAddress: String,
  method: {
    type: String,
    enum: ['web_click', 'email_reply'],
    default: 'web_click'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const AgreementLog = mongoose.model('AgreementLog', agreementLogSchema);
export default AgreementLog;