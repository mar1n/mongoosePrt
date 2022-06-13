var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/MongoosePM';
mongoose.connect(dbURI);

mongoose.Connection.on('connected', function() {
    console.log('Mongoose connected to ' +dbURI);
});

mongoose.Connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.Connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.Connection.close(function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    createdOn: {type: Date, default: Date.now },
    modifiedOn: Date,
    lastLogin: Date
});

mongoose.model('User', userSchema);

var projectSechma = new mongoose.Schema({
    projectName: String,
    createdOn: {type: Date, default: Date.now },
    modifiedOn: Date,
    createdBy: String,
    contributors: String,
    tasks: String
});

mongoose.model('Project', projectSechma);
