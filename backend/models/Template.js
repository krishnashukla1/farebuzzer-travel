// models/Template.js
import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  emailType: {
    type: String,
    required: true
  },
  data: {
    // Package details
    packageName: String,
    packageNights: String,
    packageStartDate: String,
    packageEndDate: String,
    packagePrice: String,
    numberOfPersons: String,
    
    // Hotel details
    hotelName: String,
    roomType: String,
    
    // Flight details
    departure: String,
    arrival: String,
    travelDate: String,
    bookingAmount: String,
    oldTravelDate: String,
    newTravelDate: String,
    changeFee: String,
    fareDifference: String,
    refundAmount: String,
    cancellationDate: String,
    customMessage: String,
    confirmationNumber: String,
    airline: String,
    
    // Other services
    carType: String,
    rentalDays: String,
    insuranceType: String,
    insuranceCoverage: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Template', templateSchema);