const negotiationService = require('../service/negotiationService.js');

exports.makeOffer = async (req, res) => {
  try {
    const offer = await negotiationService.makeOffer(req.user._id, req.body);
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSellerOffers = async (req, res) => {
    try {
        const offers = await negotiationService.getSellerOffers(req.user._id);
        res.status(200).json(offers);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  };
  

exports.respondToOffer = async (req, res) => {
  try {
    const offer = await negotiationService.respondToOffer(
      req.params.id,
      req.body.response,
      req.body.counterPrice
    );
    res.status(200).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
