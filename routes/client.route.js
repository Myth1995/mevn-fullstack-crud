const express = require('express');
const clientRoute = express.Router();

// model
let clientModel = require('../models/Client');
let providerModel = require('../models/Provider');

// Client api
clientRoute.route('/create-client').post((req, res, next) => {
  clientModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
});

clientRoute.route('/').get((req, res, next) => {
    clientModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

clientRoute.route('/edit-client/:id').get((req, res, next) => {
   clientModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
clientRoute.route('/update-client/:id').put((req, res, next) => {
  clientModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Client successfully updated!')
    }
  })
})

// Delete
clientRoute.route('/delete-client/:id').delete((req, res, next) => {
  clientModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


//Provider api
clientRoute.route('/provider').get((req, res, next) => {
    providerModel.find((error, data) => {
     if (error) {
      console.log("Get Providers error: " + error)
       return next(error)
     } else {
       res.json(data)
     }
   }).sort({"id": 1})
 })

// Delete
clientRoute.route('/delete-provider/:id').delete((req, res, next) => {
  providerModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

clientRoute.route('/update-provider/:id').put((req, res, next) => {
  clientModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Client successfully updated!')
    }
  })
})


module.exports = clientRoute;