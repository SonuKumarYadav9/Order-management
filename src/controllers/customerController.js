const customerModel = require("../models/customerModel")
const bcrypt= require("bcrypt")

const {isEmpty, isValid ,isValidName, isValidEmail, isValidPhone} = require("../validations/validation")

const createUser = async(req,res)=>{
    try {
        let data = req.body

//Validation Starts

    if(isEmpty(data).length===0){
        return res.status(404).send({status:true,msg:"Please Enter the Data"})
    }
        let { name, email, phone, password } = data;

        if (!isEmpty(name)) return res.status(400).send({ status: false, message: "Name is required" });

        if (!isValidName(name)) return res.status(400).send({status: false,message:"Name may contain only letters. Digits & Spaces are not allowed "});
    
    
        if (!isValid(email)) return res.status(400).send({ status: false, message: "Email is required" });
    
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Entered email is invalid" });
        
//Email is Exist or Not

        let emailExist = await customerModel.findOne({ email });
        if (emailExist) return res.status(400).send({ status: false, message: "This email already exists" });

        if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: "Phone is required" });

        if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: "Entered phone number is invalid" });
    
//Phone is Exist Or not

        let phoneExist = await customerModel.findOne({ phone });
        if (phoneExist) return res.status(400).send({ status: false, message: "Phone number already exists" });
    
        if (!isValid(password)) {
          return res.status(400).send({ status: false, message: "password is required" });
        }
    
        if (password.length < 8 || password.length > 15) return res.status(400).send({status: false, message: "password length should be between 8 to 15"});
    
        data.password = bcrypt.hashSync(password,10);
        data.totalOrders=0;
        data.discount=0;
        let savedData = await customerModel.create(data);
        return res.status(201).send({ status: true, message: "Data created", Data: savedData });

    

    } catch (error) {
        console.log(error)
        res.status(500).send({status:true,msg:error.message})
    }
}


module.exports.createUser = createUser














// const getUser =async(req,res)=>{
//     try {
//       let userId = req.params.userId
//       if(!isValidObjectId(userId)){return res.satus(400).json({status:flase,msg:"Please enterValid ObjectId"})}


//       let user= await customerModel.findOne({userId})
//       if(!user){return res.status(404).send({status:false,msg:"User Not found"})}

//       return res.status(200).send({status:true,data:user,msg:"user Found Success"})
//     } catch (error) {
//       console.log(error)
//       return res.status(500).send({ status: false, message: error.message });
//     }
//   }


//   const updateUser = async (req,res)=>{

//     try {
//      const { userId } = req.params;
   
//      if (!isValidObjectId(userId)) {
//        return res
//          .status(400)
//          .send({ status: false, message: "Please provide valid ID" });
//      }
//      const data = req.body;
//      const files = req.files;
//      const { password } = data;
//      const updateUserData = {};
   
//      const isUserExist = await userModel.findById(userId);
//      if (isUserExist.isDeleted == true)
//      return res
//        .status(404)
//        .send({
//          status: false,
//          message: "The user not found or already deleted.",
//        });
//      if (data._id) {
//        return res
//          .status(400)
//          .send({ status: false, message: "can not update user id" });
//      } 
//      if (data.name) {
//        if (!isValid(data.name)) {
//          return res
//            .status(400)
//            .send({ status: false, message: "please provide valid  name" });
//        }
//        updateUserData.name = data.name;
//      }
//      if (data.email) {
//        if (!validEmail.validate(data.email)) {
//          return res
//            .status(400)
//            .send({ status: false, message: "Please provide valid email Id" });
//        }
//        const isEmailInUse = await customerModel.findOne({ email: data.email });
//        if (isEmailInUse) {
//          return res.status(400).send({
//            status: false,
//            message: "email already registered, enter different email",
//          });
//        }
//        updateUserData.email = data.email;
//      }
//      if (data.mobile) {
//        if (!mobileRegex.test(data.mobile)) {
//          return res.status(400).send({
//            status: false,
//            message:
//              "Please provide 10 digit number && number should start with 6,7,8,9",
//          });
//        }
//        const ismobileInUse = await customerModel.findOne({ mobile: data.mobile });
//        if (ismobileInUse) {
//          return res.status(400).send({
//            status: false,
//            message: "mobile number already registered, enter different number",
//          });
//        }
//        updateUserData.mobile = data.mobile;
//      }
//      //it check image avilable or not
    
//      if (password) {
//        const hash = await bcrypt.hash(password, saltRounds);  //
//        updateUserData.password = hash;
//      };
//      const updateUser = await customerModel.findOneAndUpdate(
//        { _id: userId },
//        updateUserData,
//        { new: true }
//      );
//      return res.status(200).send({
//        status: true,
//        message: "User profile update successfully",
//        data: updateUser,
//      });
//     } catch (error) {
//      console.log(error)
//      return res.status(500).send({ status: false, message: error.message });
//    }
//      }


//      const deleteUser = async (req,res)=>{
//         try{
//          let userId=req.params.userId
     
//          // if(isValidObjectId(userId)){return res.status(400).send({status:false,msg:"Invalid UserId"})}
     
//          let isDeletedUser=await customerModel.findById(userId)
//          if (isDeletedUser.isDeleted == true)
//            return res
//              .status(404)
//              .send({
//                status: false,
//                message: "The user not found or already deleted.",
//              });
     
//          let deletedUser= await customerModel.findByIdAndUpdate(
//              { _id: userId },
//              { $set: { isDeleted: true} },
//              { new: true }
//            )
//            .select({ _id: 1, name: 1, isDeleted: 1 });
     
//          res
//            .status(200)
//            .send({
//              status: true,
//              message: "User deleted successfullly.",
//              data: deletedUser,
//            });
         
//          }catch (error) {
//              return res.status(500).send({ status: false, message: error.message });
//            }
//        }



