// sans "type": "module" dans le package.json
// const express = require("express");

// avec "type": "module" dans le package.json
// import express from "express"

const express = require("express");
const PORT = process.env.PORT ?? 5500;
const app = express();

const sports = [
	{
		id: 1,
		name: "Soccer",
	},
	{
		id: 2,
		name: "Hockey",
	},
	{
		id: 3,
		name: "Baseball",
	},
];

app.use(express.json());

/**
 * CRUD = READ === GET
 */
app.get("/", (request, response) => {
	response.send("Coucou");
});

app.get("/api/sports", (req, res) => {
	res.send(sports);
});

app.get("/api/sports/:id", (req, res) => {
	const sport = sports.find((sport) => sport.id === parseInt(req.params.id));
	if (!sport) {
		res.status(404).send("Sport not found");
	} else {
		res.send(sport);
	}
});

/**
 * CRUD = CREATE === POST
 */
app.post("/api/sports", (req, res) => {
	const newSport = {
		id: sports.length + 1,
		name: req.body.name,
	};
	sports.push(newSport);
	res.send(`"${newSport.name}" added.`);
});

/**
 * CRUD = PUT === UPDATE
 */
app.put("/api/sports/:id", (req, res) => {
	const sport = sports.find((sport) => sport.id === parseInt(req.params.id));
	if (!sport) {
		res.status(404).send("Sport not found");
	} else {
		sport.name = req.body.name;
		res.send(`${sport.name} updated.`);
	}
});

/**
 * CRUD = DELETE === DELETE
 */
app.delete("/api/sports/:id", (req, res) => {
	const sport = sports.find((sport) => sport.id === parseInt(req.params.id));
	if (!sport) {
		res.status(404).send("Sport not found");
	} else {
		const index = sports.indexOf(sport);
		sports.splice(index, 1);
		res.send(`${sport.name} deleted.`);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
