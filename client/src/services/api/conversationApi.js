import { apiClient } from './client.js';

export const conversationApi = {
  createConversation: async () => {
    return apiClient('/conversations', { method: 'POST' });
  },
  getConversations: async () => {
    return apiClient('/conversations');
  },
  getConversation: async (id) => {
    return apiClient(`/conversations/${id}`);
  },
  deleteConversation: async (id) => {
    return apiClient(`/conversations/${id}`, { method: 'DELETE' });
  },
};
