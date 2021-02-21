const stateSchema = require("../Model/State");
const axios = require("axios");
const State = require("../Model/State");

const getStates = async (req, res) => {
  const states = await stateSchema.find();
  res.json({ states });
};

const getEditableStates = async (req, res, next) => {
  const states = await stateSchema.find();
  res.json({ auth: true, states });
};

const chargeDatas = (req, res) => {
  axios
    .get(
      "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json",
      {}
    )
    .then(async response => {
      let states = [];
      for (let state in response.data) {
        const newState = new stateSchema({
          nameState: response.data[state].departamento,
          vaccinated: 0,
          population: 0,
          percentage: 0
        });
        const stateSaved = await newState.save();
        states.push(stateSaved);
      }
      res.json({ data: states, size: states.length });
    });
};

const editState = async (req, res) => {
  try {
    const state = await State.findById(req.body.id);
    state.vaccinated = req.body.vaccinated;
    state.population = req.body.population;
    const stateEdit = await state.save();
    res.json(stateEdit).status(200);
  } catch (error) {
      console.log(error.message)
  }
};

module.exports = { getStates, chargeDatas, getEditableStates, editState };
