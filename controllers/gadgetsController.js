const { Gadget } = require('../models');
const generateRandomCodename = require('../utils/generateCodename');


// GET: Retrieve all gadgets with random success probability
const getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = status ? { status } : {};
    const gadgets = await Gadget.findAll({ where: whereClause });

    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      successProbability: `${Math.floor(Math.random() * 101)}% success probability`,
    }));

    res.status(200).json({ message: 'Gadget fetched successfully', gadgetsWithProbability });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching gadgets', error: error.message });
  }
};

// POST: Add a new gadget
const addGadget = async (req, res) => {
  try {
    const codename = generateRandomCodename();

    const newGadget = await Gadget.create({
      name: codename,
      status: 'Available'
    });

    return res.status(201).json({ message: 'Gadget added successfully', gadget: newGadget });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding gadget', error: error.message });
  }
};

// PATCH: Update a gadget
const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });
    await gadget.update(updates);
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gadget', error: error.message });
  }
};

// DELETE: Decommission a gadget
const decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });
    await gadget.update({ status: 'Decommissioned', decommissionedAt: new Date() });
    res.status(201).json({ message: 'Gadget decommissioned', gadget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST: Self-destruct a gadget
const selfDestructGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });

    const confirmationCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    await gadget.update({ status: 'Destroyed' });

    res.json({
      message: `Self-destruct sequence activated for ${gadget.name}`,
      confirmationCode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGadgets,
  addGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
};
