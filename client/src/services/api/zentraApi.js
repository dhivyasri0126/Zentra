import { apiClient } from './client.js';

export const zentraApi = {
  /**
   * Submit visual evidence & prompt to Zentra Evidence Engine
   * @param {Object} params
   * @param {File} [params.file] - Image file to upload
   * @param {string} [params.sessionId] - Active session UUID
   * @param {string} [params.userPrompt] - User's prompt or question
   * @returns {Promise<{
   *   sessionId: string,
   *   sufficient: boolean,
   *   verified_answer?: string,
   *   suggested_questions?: string[],
   *   missing_evidence?: string,
   *   next_best_view_prompt?: string
   * }>}
   */
  verifyVisualEvidence: async ({ file, sessionId, userPrompt }) => {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    if (sessionId) {
      formData.append('sessionId', sessionId);
    }
    if (userPrompt !== undefined && userPrompt !== null) {
      formData.append('userPrompt', userPrompt);
    }

    return apiClient('/zentra/verify', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Retrieve session history from PostgreSQL
   * @param {string} sessionId
   * @returns {Promise<{
   *   sessionId: string,
   *   history: Array<{
   *     id: number,
   *     userPrompt: string,
   *     aiResponse: Object,
   *     createdAt: string
   *   }>
   * }>}
   */
  getSessionHistory: async (sessionId) => {
    return apiClient(`/zentra/session/${sessionId}`, {
      method: 'GET',
    });
  },

  /**
   * Fetch all sessions for history sidebar & sessions table
   * @returns {Promise<{
   *   sessions: Array<{
   *     id: string,
   *     title: string,
   *     imageCount: string,
   *     messageCount: number,
   *     createdAt: string,
   *     lastActivity: string
   *   }>
   * }>}
   */
  getAllSessions: async () => {
    return apiClient('/zentra/sessions', {
      method: 'GET',
    });
  },

  getImageHistory: async () => {
    return apiClient('/zentra/images', {
      method: 'GET',
    });
  },

  /**
   * Delete all persisted anonymous sessions, images, and conversation history.
   * This is intentionally used on application access so the workspace starts
   * empty instead of showing data from a previous run.
   */
  clearAllSessions: async () => {
    return apiClient('/zentra/sessions', {
      method: 'DELETE',
    });
  },

  /**
   * Delete one persisted session and its related images/history.
   * @param {string} sessionId
   */
  deleteSession: async (sessionId) => {
    return apiClient(`/zentra/session/${sessionId}`, {
      method: 'DELETE',
    });
  },
};

export default zentraApi;
