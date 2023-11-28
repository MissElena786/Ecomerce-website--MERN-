import Address from "../model/Address.model.js";
import User from "../model/USER.model.js"




const AddAddress = async (req, res) => {
  const { user_id, h_number, street, landmark, state, country, pinCode, district } = req.body;

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not Found with this id",
      });
    } else {
      try {
        const address = await Address.create({
          user_id,
          h_number,
          street,
          landmark,
          state,
          country,
          pinCode,
          district,
        });

        if (!address) {
          return res.status(500).json({
            success: false,
            message: "Address not created",
          });
        }

        res.status(200).json({
          success: true,
          message: "Address Created Successfully",
          address,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `ERROR ${error}`,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `ERROR ${error}`,
    });
  }
};

export {
   AddAddress
}