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
  const cleanId = String(id).trim();
  const existingItemIndex = cart.findIndex(item => String(item.id).trim() === cleanId);

  if (existingItemIndex > -1) {
    const currentQty = parseInt(cart[existingItemIndex].quantidade, 10) || 0;
    cart[existingItemIndex].quantidade = currentQty + 1;
  } else {
    cart.push({
      id: cleanId,
      titulo: titulo,
      preco: parseFloat(preco) || 0,
      imagem: imagem,
      quantidade: 1
    });
  }
  saveCart(cart);
}

// Remove um item do carrinho
function removeFromCart(id) {
  let cart = getCart();
  const cleanId = String(id).trim();
  cart = cart.filter(item => String(item.id).trim() !== cleanId);
  saveCart(cart);
}

// Decrementa a quantidade ou remove se for 0
function decreaseQuantity(id) {
  let cart = getCart();
  const cleanId = String(id).trim();
  const existingItemIndex = cart.findIndex(item => String(item.id).trim() === cleanId);

  if (existingItemIndex > -1) {
    const currentQty = parseInt(cart[existingItemIndex].quantidade, 10) || 1;
    const newQty = currentQty - 1;
    if (newQty <= 0) {
      cart = cart.filter(item => String(item.id).trim() !== cleanId);
    } else {
      cart[existingItemIndex].quantidade = newQty;
    }
    saveCart(cart);
  }
}

// Atualiza a quantidade diretamente
function updateQuantity(id, quantidade) {
  let cart = getCart();
  const cleanId = String(id).trim();
  const existingItemIndex = cart.findIndex(item => String(item.id).trim() === cleanId);

  if (existingItemIndex > -1) {
    const qty = parseInt(quantidade, 10) || 0;
    if (qty <= 0) {
      cart = cart.filter(item => String(item.id).trim() !== cleanId);
    } else {
      cart[existingItemIndex].quantidade = qty;
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
  return cart.reduce((total, item) => total + (parseInt(item.quantidade, 10) || 0), 0);
}

// Calcula o valor total do carrinho
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + ((parseFloat(item.preco) || 0) * (parseInt(item.quantidade, 10) || 0)), 0);
}

// Gera o link de WhatsApp com o carrinho formatado
function generateWhatsAppLink(phone) {
  const cart = getCart();
  if (cart.length === 0) return '';

  let message = `Olá, vim pelo site da Sonharte e gostaria de encomendar os seguintes produtos:\n\n`;

  cart.forEach(item => {
    const subtotal = ((item.preco || 0) * item.quantidade).toFixed(2);
    message += ` *${item.quantidade}x ${item.titulo}*\n`;
    message += `   Preço unitário: R$ ${(item.preco || 0).toFixed(2)}\n`;
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
