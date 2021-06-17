import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: true,
        },
        foodList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true },
);

const Menu = mongoose.model('Menu', menuSchema);
 
export default Menu;
module.exports = Menu;