// hooks/useTeamManagement.js
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';


export const useTeamManagement = () => {
  const { user } = useAuthContext();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data
  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/user/getTeamAsCoach/${user?.user?._id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch team data');
      }
      
      setTeam(data.team);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTeamName = async (newName) => {
    try {
      const response = await fetch(`http://localhost:4000/api/team/updateTeamName/${team._id}`, {
        method: 'PUT',  // Changed to PUT to match backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update team name');
      }
  
      await fetchTeam(); // Refresh team data
      return true;
    } catch (error) {
      console.error("Update team name error:", error);
      setError(error.message);
      return false;
    }
  };

  // Add new player
  const addPlayer = async (playerData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/player/create/${team._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playerData)
      });

      if (!response.ok) {
        throw new Error('Failed to add player');
      }

      await fetchTeam(); // Refresh team data
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Update player
  const updatePlayer = async (playerId, playerData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/player/update/${playerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playerData)
      });

      if (!response.ok) {
        throw new Error('Failed to update player');
      }

      await fetchTeam(); // Refresh team data
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Delete player
  const deletePlayer = async (playerId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/player/delete/${team._id}/${playerId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete player');
      }

      await fetchTeam(); // Refresh team data
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Initial fetch
  useEffect(() => {
    if (user?.user?._id) {
      fetchTeam();
    }
  }, [user]);

  return {
    team,
    loading,
    error,
    updateTeamName,
    addPlayer,
    updatePlayer,
    deletePlayer,
    refreshTeam: fetchTeam
  };
};