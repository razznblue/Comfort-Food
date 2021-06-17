import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
        },
        ingredients: [],
        menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    },
    { timestamps: true },
);

const Food = mongoose.model('Food', foodSchema);
 
export default Food;
module.exports = Food;