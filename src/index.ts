console.log("hello");

import { DataTypes, Sequelize } from "sequelize"
import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"

const app = express();
const PORT = process.env.PORT as string;
app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const Recette = sequelize.define("Recette", {
  nom: {
    type: DataTypes.STRING,
  },
  img_url: {
    type: DataTypes.STRING,
  },
  duree: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
})
sequelize
  // .sync({ force: true })
  .sync()

  .catch(error => {
    console.error('Erreur de synchronisation:', error);
  });



app.get('/test', async (req, res) =>{
  res.json("la liste de la recette: " + " " + req.body.api_nom + " " + req.body.api_img + " " + req.body.api_duree + " " + req.body.api_note)
})

app.post('/recettes_save', async (req, res) => {
  const recette_save = await Recette.create({
    nom: req.body.api_nom,
    img_url: req.body.api_img,
    duree: req.body.api_duree,
    note: req.body.api_note,
  })
  res.json(recette_save)
})

app.delete('/recettes_delete/:id', async (req, res) => {
  await Recette.destroy({where: {id: req.params.id}})
  res.send("delete" + req.params.id)
}) 

// "https://www.marmiton.org/recettes/recette-hasard.aspx?v=2"

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);