import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth,googleProvider } from '../Firebase/firebase.config';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('user');

// useEffect(() => {
//   if (user?.email) {
//     fetch(`https://rentwheels-server-five.vercel.app/users?email=${user.email}`)
//       .then(res => res.json())
//       .then(data => setRole(data.role || 'user'));
//   }
// }, [user]);

useEffect(() => {
  if (!user?.email) return;

  fetch(`https://rentwheels-server-five.vercel.app/users/${user.email}`)
    .then(res => res.json())
    .then(data => {
      if (data?.role) {
        setRole(data.role);
      } else {
        setRole('user');
      }
    })
    .catch(() => setRole('user'));
}, [user]);
  

const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('Current user:', currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'admin@demo.com';

  const authInfo = {
    user,
    loading,
    isAdmin,
    registerUser,
    loginUser,
    googleLogin,
    updateUserProfile,
    logoutUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};