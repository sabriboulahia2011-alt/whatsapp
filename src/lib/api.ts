import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

export default api;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function apiGet(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error('API GET error');
  return res.json();
}

export async function apiPost(path: string, data: object) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API POST error');
  return res.json();
}

export async function starMessage(messageId: string) {
  const res = await fetch(`${BASE_URL}/messages/${messageId}/star`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to star message');
  return res.json();
}

export async function unstarMessage(messageId: string) {
  const res = await fetch(`${BASE_URL}/messages/${messageId}/star`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to unstar message');
  return res.json();
}

export async function createGroupChat(name: string, userIds: string[]) {
  const res = await apiPost('/chats/group', { name, userIds });
  if (!res) throw new Error('Failed to create group chat');
  return res;
}