const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const formData = req.body;
    await Ticket.create(formData);

    res.status(200).json({ message: "Ticket data saved successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ❌", error });
  }
};

module.exports = { createTicket };
