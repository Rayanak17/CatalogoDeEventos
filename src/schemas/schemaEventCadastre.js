import Joi from "joi";
import { AccessibilityLevel } from "../interfaces/eventInterface";

export const eventSchema = Joi.object({
  eventTitle: Joi.string().trim().min(3).max(120).required().messages({
    "string.empty": "Título é obrigatório",
    "string.min": "Mínimo 3 caracteres",
    "string.max": "Máximo 120 caracteres",
  }),

  eventDescription: Joi.string().trim().min(3).max(600).optional().messages({
    "string.min": "Mínimo 3 caracteres",
    "string.max": "Máximo 600 caracteres",
  }),

  eventLink: Joi.string().uri().optional().messages({
    "string.uri": "Deve ser uma URL válida",
  }),

  eventPrice: Joi.number().min(0).max(999999.99).required().messages({
    "number.base": "Deve ser um número",
    "number.min": "Não pode ser negativo",
    "number.max": "Máximo R$999.999,99",
    "any.required": "Preço é obrigatório",
  }),

  eventAddressStreet: Joi.string().trim().min(10).max(120).required().messages({
    "string.empty": "Rua obrigatória",
    "string.min": "Mínimo 10 caracteres",
    "string.max": "Máximo 120 caracteres",
  }),

  eventAddressNumber: Joi.string().trim().max(8).pattern(/^[a-zA-Z0-9\s]+$/).required().messages({
    "string.empty": "Número obrigatório",
    "string.max": "Máximo 8 caracteres",
    "string.pattern.base": "Apenas letras, números e espaços",
  }),

  eventAddressNeighborhood: Joi.string().trim().min(5).max(20).required().messages({
    "string.empty": "Bairro obrigatório",
    "string.min": "Mínimo 5 caracteres",
    "string.max": "Máximo 20 caracteres",
  }),

  eventAddressComplement: Joi.string().trim().max(30).optional().messages({
    "string.max": "Máximo 30 caracteres",
  }),

  startDateTime: Joi.date().min("now").required().messages({
    "date.base": "Data de início inválida",
    "any.required": "Data de início é obrigatória",
    "date.min": "Não pode ser no passado",
  }),

  endDateTime: Joi.date().greater(Joi.ref("startDateTime")).optional().messages({
    "date.base": "Data de término inválida",
    "date.greater": "Deve ser após a data de início",
  }),

  eventAccessibilityLevel: Joi.string()
    .valid(...Object.values(AccessibilityLevel))
    .optional()
    .messages({
      "any.only": "Nível de acessibilidade inválido",
    })
});
