import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const topicSchema = Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    user_id: { type: String, required: true},
},
    { timestamps: true},
);

const Topic = model('Topic', topicSchema);

export default Topic;