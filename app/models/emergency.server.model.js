const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmergencyAlertSchema = new Schema({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  patient: {
    type: Schema.ObjectId,
    ref: "Patient",
  },
  nurse: {
    type: Schema.ObjectId,
    ref: "Nurse",
  },
});

mongoose.model("EmergencyAlert", EmergencyAlertSchema);
