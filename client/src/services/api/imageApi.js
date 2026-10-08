import { apiClient } from './client.js';

export const imageApi = {
  uploadImage: async (file, conversationId) => {
    const formData = new FormData();
    formData.append('image', file);
    if (conversationId) {
      formData.append('conversationId', conversationId);
    }
    return apiClient('/upload', {
      method: 'POST',
      body: formData,
    });
  },
};
