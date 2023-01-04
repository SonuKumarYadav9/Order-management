const express = require("express")
const customerController= require("../controllers/customerController")
const orderController = require("../controllers/orderController")


const router = express.Router()


router.post("/createUser", customerController.createUser)
router.post("/createOrder",orderController.createOrder)

router.get("/test", (req,res)=>{
    return res.status(200).send({status:true,msg:"TEST ME"})
})


router.all("/*", async function (req, res) {
    res.status(404).send({ status: false, msg: "Page Not Found!" });
  });


module.exports = router