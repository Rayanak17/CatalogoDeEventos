/**
 * Função para criar um endereço
 * @param {string} street - Rua do endereço
 * @param {string} number - Número do endereço
 * @param {string} neighborhood - Bairro do endereço
 * @param {string} [complement] - Complemento do endereço (opcional)
 * @returns {Object} - Objeto com as informações do endereço
 */
export function createAddress(street, number, neighborhood, complement = '') {
    return {
      street,
      number,
      neighborhood,
      complement,
    };
  }
  