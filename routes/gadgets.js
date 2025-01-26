const express = require('express');
const router = express.Router();
const gadgetsController = require('../controllers/gadgetsController');

// GET: Retrieve all gadgets
router.get('/', gadgetsController.getAllGadgets);

// POST: Add a new gadget
router.post('/', gadgetsController.addGadget);

// PATCH: Update a gadget
router.patch('/:id', gadgetsController.updateGadget);

// DELETE: Decommission a gadget
router.delete('/:id', gadgetsController.decommissionGadget);

// POST: Self-destruct a gadget
router.post('/:id/self-destruct', gadgetsController.selfDestructGadget);

module.exports = router;
