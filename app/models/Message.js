import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = Schema({
    content: { type: String, required: true},
    user_id: { type: String, required: true},
    topic_id: { type: String, required: true},
},
    { timestamps : true},
);

const Message = model('Message', messageSchema);

export default Message;