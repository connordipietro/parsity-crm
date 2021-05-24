const mongoose = require("mongoose");
const router = require("express").Router();
const Company = require("../models/company");
const companies = require("../dev-data/companies")

router.get("/companies", (req, res)=> {
  Company.find({}).exec((err, companies) => {
    res.send(companies);
  })
})

router.get("/companies/:id", (req, res) => {
  Company.findById(req.params.id).exec((err, company) => {
    if (err) console.log(err)

    if(!company) {
      res.status(404).send("No Company Found with that Id");
    }
    res.send(company)
  })
})

router.get("/generate-company-dev-data", (req, res)=> {
  Company.deleteMany({}).exec().then(
    companies.forEach(company => {
      let newCompany = new Company(company);
      newCompany.save((err) => {
        if (err) throw err;
      });
    }) 
  );
  res.send('saved the fake data')
})

module.exports = router;