const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true }, // room id or conversation id
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
