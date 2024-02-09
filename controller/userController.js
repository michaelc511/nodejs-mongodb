import User from "../model/userModel.js";

// For posting data into database
export const create = async (req, res) => {
  try {
    // create userData
    const userData = new User(req.body);
    const { email } = userData;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists" });
    }

    const saveduser = await userData.save();
    res.status(200).json(saveduser);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Internal Server Error" + err.message,
      });
  }
};

// For getting data from database
export const fetch = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Internal Server Error" + err.message,
      });
  }
};

// For updating data in database
export const update = async (req, res) => {
  try {
    const  id  = req.params.id;
    // console.log("ID: ",  req.params.id);
    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User is not found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(201).json(updateUser);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Internal Server Error" + err.message,
      });
  }
};

// For deleting data from database 
export const deleteUser = async (req, res)=>{
  try {
      const id = req.params.id;
      const userExist = await User.findOne({_id:id})
      if(!userExist){
          return res.status(404).json({message : " User Not Found. "})
      }
      await User.findByIdAndDelete(id);
      res.status(201).json({message : " User deleted Successfully."})
  } catch (error) {
      res.status(500).json({error : " Internal Server Error. "})
  }
}

// // Basic set up
// export const fetch = async (req, res) => {
//     try {
//         // const data = await client.db(dbname).collection("users").find({}).toArray();
//         // res.status(200).json(data);
//         res.json("hello world")
//     } catch (err) {
//         res.status(500).json({ error :"Internal Server Error" + err.message });
//     }
// }
