import mongoose from 'mongoose';

function getTime() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hour}:${minutes}:${seconds}`;
}

const MessageModel = new mongoose.Schema({
  login: { type: String, required: true },
  date: { type: String, default: getTime() },
  message: { type: String, required: true }
});

export default mongoose.model('Message', MessageModel);
