import Contact from "../models/Contact.js";

const postContact = async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      address,
      message,
      createdBy: req.user.id,
    });

    const savedContact = await newContact.save();

    return res.json({
      success: true,
      message: "Message sent successfully",
      data: savedContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find({
      createdBy: req.user.id,   
    }).populate("createdBy", "email");

    return res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { postContact, getContact };