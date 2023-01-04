const orderModel = require("../models/orderModel");
const customerModel=require("../models/customerModel")

const {
  isEmpty,
  isValid,
  isValidObjectId
} = require("../validations/validation");

const createOrder = async (req, res) => {
  try {
    let data = req.body;
    if(!isEmpty(data)){
        return res.status(404).send({status:true,msg:"Please Enter data and Valid Data"})
    }
    
     
     let { customerId, name, totalPrice } = data;

     if(!isValidObjectId(customerId)){return res.staus(404).send({status:true,msg:"Please Enter Valid Customer ID "})}

     let customerIdData=await customerModel.findOne({_id:customerId});
     if(customerIdData.length==0){
         return res.status(404).send({ status: false, message: "No customer Found" });
       }
       if(!isValid(name)){return res.staus(404).send({status:true,msg:"Please Enter ValidName "})}

    if(isNaN(totalPrice) || totalPrice<=0){
        return res.status(400).send({ status: false, message: "Enter valid price" });
      }

      let discount=0;
      let category ="Regular";

        if(customerIdData.totalOrders <10){
          discount=0
        totalPrice=totalPrice
        }
        else if(customerIdData.totalOrders >=10 && customerIdData.totalOrders < 20){
          discount = totalPrice*(10/100)
          totalPrice =totalPrice*(90/100)
          category = "Gold"
        }
        else{
          discount = totalPrice*20/100
          totalPrice=totalPrice*80/100
          category = "Platinum"
        }

        await orderModel.create(data)
        let createOrder = await customerModel.findByIdAndUpdate(
          {_id:customerId},
          {$inc:{totalOrders:+1},
          $set:{totalPrice,category,discount}
        },
          {new:true}
          )
// console.log(createOrder)
      return res.status(201).send({status:true,data:createOrder})

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: true, msg: error.message });
  }
};

module.exports.createOrder = createOrder