import { model, Schema } from 'mongoose'
import { Pets } from '../interfaces/pets'

const PetsSchema = new Schema({
    name: { type: String, default: 'No Name' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, default: 'Withouth description' },
    species: { type: Schema.Types.ObjectId, ref: 'Species', required: true },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unknown'],
        required: true,
        default: 'Unknown',
    },
    size: { type: String, enum: ['Small', 'Medium', 'Large'], required: true },
    type: { type: String, enum: ['Lost', 'Found'], required: true },
    breed: { type: Schema.Types.ObjectId, ref: 'Breed', required: true },
    age: { type: Number },
    color: [
        {
            type: String,
            enum: ['White', 'Black', 'Brown', 'LightBrown', 'Grey'],
            required: true,
        },
    ],
    location: { type: String },
    status: { type: String, default: 'Active' },
    date: { type: Date, required: true },
    img: [
        {
            type: String,
            default:
                'https://asset.cloudinary.com/diyk4to11/c9fa622c857b556ee8e47c81f8422a33',
        },
    ],
    observation: { type: String },
    createdAt: { type: Date, default: Date.now },
})

export default model<Pets>('Pet', PetsSchema)
