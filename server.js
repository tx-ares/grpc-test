// SERVER SIDE

// console.log( __dirname, " << __dirname")
var PROTO_PATH = __dirname + '\\protos\\test.proto';

// console.log(PROTO_PATH , " << path")

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld; // grpc.load(PROTO_PATH).packagename <- as defined in test.proto

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Sup! ' + call.request.name});
}

function sayHelloAgain(call, callback) {
    callback(null, {message: 'SUP! x2 '})
}

function logTheObj(call, callback) {
    console.log(call.request);
    callback(null, call.request)
}
//
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(
      hello_proto.Greeter.service,
      {
          sayHello: sayHello,
          sayHelloAgain: sayHelloAgain,
          logTheObj: logTheObj
      });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();

  console.log(" Server started: " , server.started)
}

main();
