const { Schema, model } = require('mongoose');

const topicSchema = Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    userId: { type: String, required: true},
    creationDate: { type: Date, required: true},
});

module.exports = model('Topic', topicSchema);