import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
        },
        ingredients: [],
        menu: { type: Schema.Types.ObjectId, ref: 'Menu' },
    },
    { timestamps: true },
);

const Food = mongoose.model('Food', foodSchema);
 
export default Food;