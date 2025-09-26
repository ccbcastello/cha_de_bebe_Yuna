
import { GiftItem } from './types';

// IMPORTANT: Paste your deployed Google Apps Script URL here.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRUXLKSlOvwunakKi9-NXCgMPuanS5Z9LNTqELasRFaD3esCT-i4lS4kEnXzY6eVhbFg/exec';

// Helper function to handle fetch requests
async function apiRequest(payload: object = {}, method: 'GET' | 'POST' = 'GET') {
  try {
    let response;
    if (method === 'GET') {
      const url = `${SCRIPT_URL}?${new URLSearchParams(payload as Record<string, string>)}`;
      response = await fetch(url);
    } else {
      response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Required for Apps Script simple POST
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Apps Script web apps can perform a redirect on POST, so handle the response text
    const text = await response.text();
    return JSON.parse(text);

  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export const getItems = (): Promise<GiftItem[]> => {
  return apiRequest({ action: 'getItems' }, 'GET');
};

export const reserveItem = (itemName: string, reserverName: string): Promise<{ success: boolean; error?: string }> => {
  const payload = { action: 'reserveItem', itemName, reserverName };
  return apiRequest(payload, 'POST');
};

export const confirmAttendance = (data: { name: string, email: string, confirmation: string, guests: number }): Promise<{ success: boolean }> => {
  const payload = { action: 'confirmAttendance', ...data };
  return apiRequest(payload, 'POST');
}

export const sendMessage = (data: { name: string, email: string, message: string }): Promise<{ success: boolean }> => {
  // To match the sheet, we also need name and email. Assuming they are available.
  // For now, let's pass dummy data if not provided, but the UI should collect this.
  const payload = { 
      action: 'sendMessage',
      name: data.name || 'Anonymous', // Placeholder
      email: data.email || 'anonymous@example.com', // Placeholder
      message: data.message
  };
  return apiRequest(payload, 'POST');
}
