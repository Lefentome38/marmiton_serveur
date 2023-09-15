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

const table_recette = sequelize.define("table_recette", {
  non: {
    type: DataTypes.STRING,
  },
  imag_url: {
    type: DataTypes.STRING,
  },
  duree: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.NUMBER,
  },
}, {
  timestamps: false,
})
sequelize
  .sync({ force: true })

  .catch(error => {
    console.error('Erreur de synchronisation:', error);
  });



app.get('/ajouter/:api_nom/:api_imag/:api_duree/:api_note', async(req, res) =>{
  res.send("la liste" + " " + req.params.api_nom + " " + req.params.api_imag + " " + req.params.api_duree + " " + req.params.api_note)
})

app.get('/BDD_test/:api_nom/:api_imag/:api_duree/:api_note', (req, res) => {
  BDD()
  async function BDD() {
    console.log('La synchronisation a réussi.');
    table_recette.create({
      non: req.params.api_nom,
      imag_url: req.params.api_imag,
      duree: req.params.api_duree,
      note: req.params.api_note,
    })
}
    res.send("sauvegarder")
})

// "https://www.marmiton.org/recettes/recette-hasard.aspx?v=2"

app.listen( parseInt(PORT), () =>
  console.log("Server is listening on port " + PORT + "...")
);