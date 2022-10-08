import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

const orderStatusType = PropTypes.shape({
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const orderType = PropTypes.shape({
  number: PropTypes.string.isRequired,
  status: orderStatusType.isRequired,
});
