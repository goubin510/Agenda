const express = require('express'),
	mongoose = require('mongoose');

const app = express(),
	Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Writer:Writer123@ds239928.mlab.com:39928/heroku_kflqvm92', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

var AgendaSchema = new Schema({
  description: {
    type: String,
    required: 'Kindly enter the head of the card'
  },
  id: {
  	type: Number,
  	required: 'Set an id please',
  	unique: true
  },
  idPere: {
  	type: Number,
  	default: 0
  },
  Date: {
  	type: Date,
  	default: null
  }
});
var Agenda = mongoose.model('Agenda', AgendaSchema);

app.use(express.static('pages'))

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.route('/book')
	.get(function(req, res) {
		Agenda.find({}, function(err, info) {
			if (err)
				res.send(err);
			else {
				res.json(info)
			}
		});
	})
	.post(function(req, res) {
		var json = {
				id: 8,
				idPere: 4,
				description: 'Task 3',
				date: null
			};
		var insert = new Agenda(json);

		insert.save(function(err, info) {
			if (err)
				res.send(JSON.stringify(err));
			else res.json(JSON.stringify(info));
		});
	})
	.put(function(req, res) {
		res.send('Put the book');
	});

app.route('/json')
	.get(function(req, res) {
		console.log("get /json")

		var obj = [{
				id: 1,
				idPere: 0,
				description: 'head',
				date: new Date("06/24/2020")
			},{
				id: 2,
				idPere: 0,
				description: 'head Bis',
				date: null
			},{
				id: 3,
				idPere: 1,
				description: 'sub title',
				date: new Date("06/26/2020")
			}];

			res.json(obj)
	});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})

function recurs (result, obj) {
	for (var i = 0; i < obj.length; i++) {
		if(obj[i].idPere == 0) {
			var temp = obj[i];

			temp.child = [1, 2, 3];
			//findSons(obj[i].child, obj, obj[i].id)

			result.push(temp)
		}
	}
}

function findSons (result, obj, Pere) {
	for (var i = 0; i < obj.length; i++) {
		if(obj[i].idPere == Pere) {
			result.push(obj[i])

			obj[i].child = []
			findSons(obj[i].child, obj, obj[i].id)

			result.push(obj[i])
		}
	}
}