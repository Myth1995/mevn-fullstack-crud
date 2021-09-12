const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let providerSchema = new Schema({
  name: {
    type: String
  },
  id: {
    type: Number
  },
}, {
  collection: 'providers'
})

module.exports = mongoose.model('Provider', providerSchema)