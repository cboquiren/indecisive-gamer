import toast from "react-hot-toast";



const base_interactions_URL = 'http://localhost:3000/interactions';

const requestInteractions = () => {
  return fetch(base_interactions_URL).then((response) => {
    if (!response.ok) {
      toast.error('Our server took a bathroom break');
      throw new Error('Could not reach the server.');
    }
    return response.json();
  })
}

export const interactionsRequests = {
  requestInteractions
}