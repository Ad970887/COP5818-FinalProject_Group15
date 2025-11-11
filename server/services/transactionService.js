// Will contain the logic for incrementing user balances from transaction.js, idempotency checks, etc.
import mongoose from "mongoose"
import User from "../models/user.js"
import Transaction from "../models/transaction.js"


// find tx by tx id
// check sender balances to confirm amt available
// update balance
