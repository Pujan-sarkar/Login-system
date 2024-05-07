const mongoose = require("mongoose");

// Establish database connection
mongoose.connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

// Define schema for the "Login" collection
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create model based on the schema
const Login = mongoose.model("Login", loginSchema);

// Export the model
module.exports = Login;
