const { Schema, model } = require('mongoose');

const messageSchema = Schema({
    content: { type: String, required: true},
    userId: { type: String, required: true},
    topicId: { type: String, required: true},
    creationDate: { type: Date, required: true},
});

module.exports = model('Message', messageSchema);