import mongoose from 'mongoose';

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        menus: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}],
    },
    { timestamps: true },
);

// Users Can use either their email or username to login!
userSchema.statics.findByLogin = async function (login) {
    // First, attempt to locate the user by username
    let user = await this.findOne({
      username: login,
    });
    // If username is not found, then locate them by email
    if (!user) {
      user = await this.findOne({ email: login });
    }
   // return the associated user
    return user;
};

// Upon deletion of a user, it's Menu's will get deleted as well.
userSchema.pre('remove', function(next) {
    this.model('Menu').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);
 
export default User;