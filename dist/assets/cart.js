// Sonharte - Sistema de Carrinho de Compras Global (Client-Side)

// Carrega o carrinho do LocalStorage
function getCart() {
  try {
    const cart = localStorage.getItem('sonharte_cart');
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error("Erro ao ler carrinho:", e);
    return [];
  }
}

// Salva o carrinho no LocalStorage e dispara o evento de atualização
function saveCart(cart) {
  try {
    localStorage.setItem('sonharte_cart', JSON.stringify(cart));
    // Dispara evento customizado para notificar componentes (Headers, Modais)
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  } catch (e) {
    console.error("Erro ao salvar carrinho:", e);
  }
}

// Adiciona um item ao carrinho
function addToCart(id, titulo, preco, imagem) {
  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantidade += 1;
  } else {
    cart.push({
      id: id,
      titulo: titulo,
      preco: parseFloat(preco),
      imagem: imagem,
      quantidade: 1
    });
  }
  saveCart(cart);
}

// Remove um item do carrinho
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

// Decrementa a quantidade ou remove se for 0
function decreaseQuantity(id) {
  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantidade -= 1;
    if (cart[existingItemIndex].quantidade <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    saveCart(cart);
  }
}

// Atualiza a quantidade diretamente
function updateQuantity(id, quantidade) {
  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantidade = parseInt(quantidade);
    if (cart[existingItemIndex].quantidade <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    saveCart(cart);
  }
}

// Limpa todo o carrinho
function clearCart() {
  saveCart([]);
}

// Conta o total de itens (soma das quantidades)
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantidade, 0);
}

// Calcula o valor total do carrinho
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// Gera o link de WhatsApp com o carrinho formatado
function generateWhatsAppLink(phone) {
  const cart = getCart();
  if (cart.length === 0) return '';

  let message = `Olá, vim pelo site da Sonharte e gostaria de encomendar os seguintes produtos:\n\n`;

  cart.forEach(item => {
    const subtotal = (item.preco * item.quantidade).toFixed(2);
    message += ` *${item.quantidade}x ${item.titulo}*\n`;
    message += `   Preço unitário: R$ ${item.preco.toFixed(2)}\n`;
    message += `   Subtotal: R$ ${subtotal}\n\n`;
  });

  message += ` *Valor Total aproximado: R$ ${getCartTotal().toFixed(2)}*\n\n`;
  message += `Gostaria de verificar a disponibilidade e combinar a retirada!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

// Expõe as funções globalmente no navegador
window.SonharteCart = {
  get: getCart,
  add: addToCart,
  remove: removeFromCart,
  decrease: decreaseQuantity,
  update: updateQuantity,
  clear: clearCart,
  count: getCartCount,
  total: getCartTotal,
  link: generateWhatsAppLink
};
