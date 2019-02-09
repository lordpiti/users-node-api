const axios = require('axios');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');

exports.loginUserGoogle = async (userId, accessToken, login, callback) => {
  
    const googleTokenUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`;
  
    try {
      if (login) {
        const response = await axios.get(googleTokenUrl);
        const data = response.data;
  
        const userData = {
          userId: data.sub,
          email: data.email,
          name: data.name,
          isVerified: true,
          authenticationType: 2,
          role: "User",
          token: uuidv4()
        }
  
        User.findOne({ email: response.data.email, authenticationType: '2'}, function (err, doc){
  
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
      }


    } catch (error) {
      console.log(error);
    }
  
};