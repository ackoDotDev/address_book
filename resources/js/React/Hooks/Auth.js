import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';


export default function Auth() {
   let history = useHistory();
   const { setUser } = useContext(UserContext);
   const [error, setError] = useState(null);

   const setUserContext = async () => {
   return await axios.get('/api/auth/user'
      ).then(res => {
         setUser(res.data.user);
         history.push('/');
      }).catch((err) => {
         setError(err.data);
      })
   }

   //Register user
   const registerUser = async (data) => {
      const { name, email, password, password_confirmation, user_type_id } = data;

      return axios.post(`/api/auth/register`, {
         name, email, password, password_confirmation, user_type_id
      }).then(async () => {
         await setUserContext();
      }).catch((err) => {
         setError(err.data);
      })
   };

   //Login user
   const loginUser = async (data) => {
      const { email, password } = data;

      return axios.post(`/api/auth/login`, {
         email, password
      }).then(async () => {
         await setUserContext();
      }).catch((err) => {
         setError(err.data);
      })
   };

   //Logout user
   const logoutUser = async() => {
      axios.post(`/api/auth/logout`).then(() => {
         setUser(null);
      }).catch((err) => {
         setError(err.data);
      });
   }

   //Update user
   const updateUser = async (data) => {
      const { name, email, user_type_id } = data;

      return axios.post(`/api/auth/update`, {
         name, email, user_type_id
      }).then(async () => {
         await setUserContext();
      }).catch((err) => {
         setError(err.data);
      })
   };

   return {
      registerUser,
      loginUser,
      logoutUser,
      updateUser,
      error
   }
}