const Message = require('../model/Message');
const sendEmail = require('../utils/sendEmail');

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error, try letter' });
  }
};

const createNewMessage = async (req, res) => {
  const { name, email, subject, text } = req.body;

  if (!name || !email || !subject || !text) {
    return res
      .status(400)
      .json({ message: 'All fields are required,name,email,subject and text' });
  }

  try {
    await Message.create({
      name,
      email,
      subject,
      text,
    });

    // Pošalji email adminu
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `Nova poruka od ${name},${subject}`,
      text: `Ime: ${name}\nEmail: ${email}\n\n${text}`,
      html: `
      <p><strong>Ime:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Poruka:</strong></p>
      <p>${text}</p>
    `,
    });

    res.status(201).json({ message: 'New message was created' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Server error, try letter', error: err.message });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: `No message id ${id} found` });
  }

  try {
    const message = await Message.findOne({ _id: id }).exec();

    if (!message) {
      return res.status(404).json({ message: `Message id ${id} not found` });
    }
    const result = await Message.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Server error, try letter', error: err.message });
  }
};

const getMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: `Message id ${id} required` });
  }

  try {
    const message = await Message.findOne({ _id: id }).exec();
    if (!message) {
      return res
        .status(404)
        .json({ message: `Message id params ${id} not found` });
    }

    res.json(message);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error server,try latter', error: err.message });
  }
};

module.exports = {
  getAllMessages,
  createNewMessage,
  deleteMessage,
  getMessage,
};
