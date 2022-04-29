const { Schema, model } = require('mongoose');

const messageSchema = Schema({
    content: { type: String, required: true},
    user_id: { type: String, required: true},
    topic_id: { type: String, required: true},
    creationDate: { type: Date, required: true},
});

module.exports = model('Message', messageSchema);