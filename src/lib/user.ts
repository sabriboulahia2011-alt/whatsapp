import api from './api';

export async function updateUserProfile(data: { name?: string; avatar?: string; status?: string }) {
  // TODO: Implement update user profile API call
  return api.put('/user/profile', data);
} 