import React, { useContext, useEffect, useState } from 'react'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import keycloak, { initializeKeycloak } from './keycloak';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const { user, setUser, sessionValidity, setSessionValidity, setAccessToken } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // Define roles required for the current app (e.g., app-2 in this case)
  const currentAppRequiredRole = 'sector-1'; // Replace with the correct app role

  // Define URLs and roles for other applications
  const appUrls = {
    app1: 'http://localhost:5173', // App 1 URL
    //   app2: 'http://localhost:3002',
    //   app3: 'http://localhost:3003', 
  };

  useEffect(() => {
    console.log("Initializing Keycloak...1");

    initializeKeycloak()
      .then(authenticated => {
        console.log(`Authenticated: ${authenticated}`);
        console.log(`Keycloak accessToken: ${keycloak.token}`);
        console.log(`Keycloak refreshToken: ${keycloak.refreshToken}`);

        axiosPrivate.post('/auth/login', {}, {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            'Refresh-Token': keycloak.refreshToken,
          },
        })
          .then(response => {
            console.log('Response from /login:', response);
            setUser(response.data);

            // Fetch user roles from Keycloak
            const roles = keycloak.realmAccess?.roles || [];
            console.log(`User roles fetched from Keycloak: ${roles.join(', ')}`);
            console.log('User roles fetched from Keycloak:' + roles);
            setUserRoles(roles);
            setAuthenticated(authenticated);

            // Check roles and set access denied if required role is missing
            if (!roles.includes(currentAppRequiredRole)) {
              console.log(`Access Denied: User does not have the required role "${currentAppRequiredRole}".`);
              setShowAccessDenied(true);
            } else {
              console.log(`Access Granted: User has the required role "${currentAppRequiredRole}".`);
              setShowAccessDenied(false); // Ensure this is set to false if access is granted
            }

            setLoading(false);

           
              window.location.href = "/user/create-account";
            

          })
          .catch(error => {
            console.error('Error during login request:', error);
            setLoading(false);
          });
      })
      .catch(err => {
        console.error('Keycloak initialization failed:', err);
        setLoading(false);
      });
  }, []);

  if (user) {
    console.log("User from login response:", user);
    console.log("Roles:", user.roles);
    console.log("Access Token:", user.accessToken);
    console.log("Username:", user.username);
    console.log("SID:", user.sid);
    
  } else {
    console.log("User data is not available yet.");
  }


  const handleClosePopup = () => {
    console.log("Closing Access Denied popup.");
    setShowAccessDenied(false);
  };

  // Check access to other apps
  const handleAppAccess = (requiredRole, appUrl) => {
    console.log(`Checking access for app with role: "${requiredRole}"`);
    if (userRoles.includes(requiredRole)) {
      console.log(`Access granted to ${appUrl} (Role: ${requiredRole})`);
      window.open(appUrl, '_blank');
    } else {
      console.log(`Access denied to ${appUrl} (Missing Role: ${requiredRole})`);
      setShowAccessDenied(true);
    }
  };

  if (loading) {
    console.log("App is loading...");
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    console.log("User is not authenticated.");
    return <div>User is not authenticated.</div>;
  }

  // If access is denied, show only the Access Denied Popup
  if (showAccessDenied) {
    return <AccessDeniedPopup onClose={handleClosePopup} />;
  }

  return (
    <div>

    </div>
  )
}

export default Login