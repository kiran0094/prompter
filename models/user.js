import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [
            /^(?![_.])(?!.*[_.]{2})[а-яА-Яa-zA-Z0-9._]{5,150}(?<![_.])$/,
            'Username invalid, it should contain 5-150 alphanumeric letters and be unique!'
        ]
    },

    image: {
        type: String,
    },
});

const User = models.User || model("User", userSchema);

export default User;
