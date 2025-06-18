const negotiationService = require('../service/negotiationService.js');
const catchAsync = require('../../utils/catchAsync');

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

exports.checkStatus = catchAsync(async (req, res) => {
  const status = await negotiationService.checkNegotiationStatus(
    req.user._id,
    req.params.productId
  );
  res.status(200).json({
    success: true,
    data: status
  });
});

exports.getNegotiationsByStatus = catchAsync(async (req, res) => {
  const { status } = req.params;
  
  // التحقق من صحة الحالة المطلوبة
  const validStatuses = ['pending', 'accepted', 'rejected', 'countered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
    });
  }

  const result = await negotiationService.getNegotiationsByStatus(req.user._id, status);
  
  res.status(200).json({
    success: true,
    data: result
  });
});
