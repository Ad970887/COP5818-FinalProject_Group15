import mongoose from "mongoose"

// Schema to track user balances
const balanceSchema = new mongoose.Schema({
    available: { 
        type: Number, 
        default: 0 },
  },
  { _id: false } // Prevents ids being applied to currencies
);

// User information schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
    },

    balances: {
        type: Map,
        of: balanceSchema,
        default: {},
    },
})

export default mongoose.model("User", userSchema)
