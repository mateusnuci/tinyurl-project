const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI

moongose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected')
}).catch((err) => {
  console.error('MongoDB connection error:', err);
})
  

const redirectUrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    expirationDate: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('RedirectUrl', redirectUrlSchema);





