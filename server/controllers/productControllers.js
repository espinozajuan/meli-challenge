import fetch from 'node-fetch';

export const queryProducts = async (req, res, next) => {
  let { q } = req.query;

  if (!q) {
    res.status(400).send({ message: 'Kindly pass anything as a query string' });
  }

  try {
    q = q.trim();
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    );
    const products = await response.json();

    let result = {};

    // get first four items
    let items = products.results.filter((item, idx) => {
      return idx < 4;
    });

    // get needed properties of each item
    items = items.map((item) => {
      return {
        id: item.id ? item.id : null,
        title: item.title ? item.title : null,
        price: {
          currency: item.currency_id ? item.currency_id : null,
          amount: item.price ? item.price : null,
        },
        condition: item.condition ? item.condition : null,
        free_shipping: item.shipping.free_shipping
          ? item.shipping.free_shipping
          : null,
        picture: item.thumbnail ? item.thumbnail : null,
        seller_state_name: item.address.state_name
          ? item.address.state_name
          : null,
      };
    });

    // assign items & other properties
    result.items = items;

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getProductInfo = async (req, res, next) => {
  let { id: productId } = req.params;

  try {
    let response = await fetch(
      `https://api.mercadolibre.com/items/${productId}`
    );
    const productInfo = await response.json();

    response = await fetch(
      `https://api.mercadolibre.com/items/${productId}/description`
    );
    const productDesc = await response.json();

    let result = {};

    // build item object
    const item = {
      id: productInfo.id ? productInfo.id : null,
      title: productInfo.title ? productInfo.title : null,
      price: {
        currency: productInfo.currency_id ? productInfo.currency_id : null,
        amount: productInfo.price ? productInfo.price : null,
      },
      condition: productInfo.condition ? productInfo.condition : null,
      free_shipping: productInfo.shipping.free_shipping
        ? productInfo.shipping.free_shipping
        : null,
      picture: productInfo.pictures[0].url ? productInfo.pictures[0].url : null,
      sold_quantity: productInfo.sold_quantity
        ? productInfo.sold_quantity
        : null,
      description: productDesc.plain_text ? productDesc.plain_text : null,
    };

    result.item = item;

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
