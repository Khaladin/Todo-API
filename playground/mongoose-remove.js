const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5a4ff211cffe508218a20e8e'}).then((todo) => {
	
// });

Todo.findByIdAndRemove('5a4ff211cffe508218a20e8e').then((todo) => {
	console.log(todo);
});