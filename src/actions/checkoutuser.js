export function handleCheckout(value) {
    return ({
      type: 'UPDATE_CHECKOUT',
      payload: value
    });
  }