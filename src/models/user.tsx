// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     unique: [true, "Email alredy exist"],
//     required: [true, "Email is required"],
//   },
//   userName: {
//     type: String,
//     required: [true, "Username is required!"],
//     match: [
//       /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
//       "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
//     ],
//   },
//   image: {
//     type: String,
//   },
// });

// // checking if the user exist, use the existing use else create a new user from scratch
// const User = models.User || model("user", UserSchema);

// export default User;
