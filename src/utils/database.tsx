// import mongoose from "mongoose";

// let isConnected = false; //tracking the connecting

// export const connectToDB = async () => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log(" Mongoose is already connected");
//   return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, (
//       dbName:" share_recipe",
//       useNewUrlParser:true,
//       useUnifiedTopology:true,
//     ))

//     isConnected = true;
//     console.log(' MongoDB connected')
//   } catch (error) {
//    console.log(error);
//   }
// };
