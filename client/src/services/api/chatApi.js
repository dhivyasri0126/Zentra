import { apiClient } from './client.js';

export const chatApi = {
  sendMessage: async ({ conversationId, question, imageId, previousImageId }) => {
    return apiClient('/chat', {
      method: 'POST',
      body: { conversationId, question, imageId, previousImageId },
    });
  },
  compareImages: async ({ conversationId, previousImageId, currentImageId }) => {
    return apiClient('/compare', {
      method: 'POST',
      body: { conversationId, previousImageId, currentImageId },
    });
  },
};
