// Importando a função createAddress, caso precise usá-la para gerar o endereço
import { createAddress } from './address';

/**
 * Categorias de acessibilidade para os eventos
 */
export const AccessibilityLevel = {
  SEM_ACESSIBILIDADE: "SEM_ACESSIBILIDADE",
  ACESSIBILIDADE_BASICA: "ACESSIBILIDADE_BASICA",
  ACESSIBILIDADE_AUDITIVA: "ACESSIBILIDADE_AUDITIVA",
  ACESSIBILIDADE_VISUAL: "ACESSIBILIDADE_VISUAL",
  ACESSIBILIDADE_COMPLETA: "ACESSIBILIDADE_COMPLETA",
  NAO_INFORMADA: "NAO_INFORMADA",
};

/**
 * Função para criar um evento
 * @param {Object} params - Parâmetros para criar o evento
 * @param {string} params.eventTitle - Título do evento
 * @param {string} [params.eventDescription] - Descrição do evento
 * @param {string} [params.eventLink] - Link do evento
 * @param {number} params.eventPrice - Preço do evento
 * @param {string} params.eventAddressStreet - Rua do endereço do evento
 * @param {string} params.eventAddressNumber - Número do endereço
 * @param {string} params.eventAddressNeighborhood - Bairro do evento
 * @param {string} [params.eventAddressComplement] - Complemento do endereço
 * @param {string} params.startDateTime - Data e hora de início do evento
 * @param {string} [params.endDateTime] - Data e hora de término do evento
 * @param {string} [params.eventAccessibilityLevel] - Nível de acessibilidade do evento
 * @param {string} [params.eventCategoryId] - ID da categoria do evento
 * @param {string} [params.eventOrganizerId] - ID do organizador do evento
 * @returns {Object} - Objeto com os dados do evento
 */
export function createEvent({
  eventTitle,
  eventDescription = '',
  eventLink = '',
  eventPrice,
  eventAddressStreet,
  eventAddressNumber,
  eventAddressNeighborhood,
  eventAddressComplement = '',
  startDateTime,
  endDateTime = '',
  eventAccessibilityLevel = AccessibilityLevel.NAO_INFORMADA,
  eventCategoryId,
  eventOrganizerId,
}) {
  const address = createAddress(
    eventAddressStreet,
    eventAddressNumber,
    eventAddressNeighborhood,
    eventAddressComplement
  );

  return {
    eventTitle,
    eventDescription,
    eventLink,
    eventPrice,
    address, // Endereço gerado pela função createAddress
    startDateTime,
    endDateTime,
    eventAccessibilityLevel,
    eventCategoryId,
    eventOrganizerId,
  };
}
