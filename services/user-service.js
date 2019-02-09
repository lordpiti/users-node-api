const axios = require('axios');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');

exports.loginUser = async (userId, accessToken, authenticationType, callback) => {
  
  const googleTokenUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`;
  const facebookVerifyTokenEndPoint = `https://graph.facebook.com/me?access_token=${accessToken}&fields=email,name`;
  const facebookVerifyAppEndpoint = `https://graph.facebook.com/app?access_token=${accessToken}`;

  try {
    let userData = {};
    let response = null;

    if (authenticationType == 2) {
      //Google authentication
      response = await axios.get(googleTokenUrl);

      userData = {
        userId: response.data.sub,
        email: response.data.email,
        name: response.data.name,
        isVerified: true,
        authenticationType: authenticationType,
        role: "User",
        token: uuidv4()
      }
    }
    else {
      //Facebook authentication
      response = await axios.get(facebookVerifyTokenEndPoint);
      const response2 = await axios.get(facebookVerifyAppEndpoint);

      userData = {
        userId: response.data.id,
        email: response.data.email,
        name: response.data.name,
        isVerified: true,
        authenticationType: authenticationType,
        role: "User",
        token: uuidv4()
      }
    }

    User.findOne({ email: response.data.email, authenticationType: authenticationType}, function (err, doc){

      if (doc) {
        userData.role = doc.role;
        userData.token = doc.token;
      }
      else {
        //Create user
        const user = new User(userData);
        user
          .save()
          .then(result => {
            console.log(result);
            console.log('Created User');
          })
          .catch(err => {
            console.log(err);
          });
      }

      callback(userData);
    });

  } catch (error) {
    console.log(error);
  }
  
};

exports.checkAccess = (accessToken, authenticationType, callback) => {
  User.findOne({ token: accessToken, authenticationType: authenticationType}, function (err, doc){
    let userData = null;
    if (doc) {
      userData = {
        userId: doc.userId,
        email: doc.email,
        name: doc.name,
        isVerified: true,
        authenticationType: doc.authenticationType,
        role: doc.role,
        token: doc.token
      }
    }

    callback(userData);
  });
}