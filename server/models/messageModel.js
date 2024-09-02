const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    text: { type: String, required: true }
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;