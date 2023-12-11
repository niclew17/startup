import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <>
    <h1>Welcome {props.userName} to</h1>
    <p><img src="images/AppliRankLogo.png" alt="AppliRank" width="500px"/></p>
    <h1>Hit Generate to Rank Resumes</h1>
    <div>
      <button onClick={() => navigate('/generator')}>
        Generate
      </button>
      <button onClick={() => logout()}>
        Logout
      </button>
    </div>
    </>
  );
}
