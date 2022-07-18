const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/admin.js'];

const doc = {
  info: {
      "version": "",                // by default: "1.0.0"
      "title": "",                  // by default: "REST API"
      "description": ""             // by default: ""
  },
  host: "localhost:3001",                         // by default: "localhost:3000"
  basePath: "/user"
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js')
})