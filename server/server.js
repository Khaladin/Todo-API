var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});


app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	//Validate id using isValid 
		if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send('Wont work');
		}

		res.send({todo});

	}).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	//validate the id if not valid return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Not a valid ID');
	}
	//remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send('No todos available');
		}
		res.status(200).send(todo);
	}).catch((e) => res.status(400).send());
		// success
			//if no doc, send 404
			// if doc, send doc back with 200
		// error
			// send 400 with empty body
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};