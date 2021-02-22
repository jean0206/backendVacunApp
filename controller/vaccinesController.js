const Vaccine = require("../Model/Vaccine");

const addVaccine =async (req,res)=>{
    try {
        const newVaccine = new Vaccine({
            name:req.body.name,
            description: req.body.description,
            dose: req.body.dose,
            origin:req.body.origin,
            amount:req.body.amount
        })

        const vaccineSaved = await newVaccine.save()
        const vaccines = await Vaccine.find()
        res.json(vaccines).status(200)

    } catch (error) {
        res.json({error:error.message}).status(401)
    }
}

const editVaccine = async (req,res) => {
    try {
        const vaccineFind = await Vaccine.findById(req.body._id)
        vaccineFind.name = req.body.name
        vaccineFind.description = req.body.description,
        vaccineFind.dose = req.body.dose,
        vaccineFind.origin = req.body.origin,
        vaccineFind.amount = req.body.amount
        await vaccineFind.save()
        const allVaccine = await Vaccine.find()
        res.json(allVaccine)
    } catch (error) {
        res.json({error:error.message})
    }
}

const deleteVaccine = async (req,res)=> {
    try {
        await Vaccine.deleteOne({_id:req.body.id})
        const vaccines = await Vaccine.find()
        res.json(vaccines).status(200)
    } catch (error) {
        res.json({message:error.message})
    }
}

const getVaccines = async (req,res)=>{
    try {
        const vaccines = await Vaccine.find()
        res.json(vaccines).status(200)
    } catch (error) {
        res.json({message:error.message}).status(401)
    }
}

module.exports = {addVaccine,getVaccines,deleteVaccine,editVaccine}