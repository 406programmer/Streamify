import { axiosInstance } from "./axios.js";

export const signup = async (signUpData) => {
  const response = await axiosInstance.post("auth/signup", signUpData);
  return response.data;
};
export const login = async (loginData) => {
  const response = await axiosInstance.post("auth/login", loginData);
  console.log(response)
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("auth/logout");
  console.log(response.data);
  return response.data;
};

export const getAuthUser = async () => {
   try{ const response = await axiosInstance.get("/auth/me");
    // console.log("respond from getAuthUser api : ", res);//response has data, status, statusText, headers, config, request fields
    return response.data;}
    catch(error){
console.log("Error in getAuthUser : ",error.response.data.message);
   return null;
    }
};

export const completeOnBoarding = async (onBoardData) => {
    const response = await axiosInstance.post("/auth/onboarding", onBoardData);
    return response.data;
};  
export const getUserFriends = async () => {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
};  
export const getRecommandedUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
};  
export const getOutgoingRequests = async () => {
  const response = await axiosInstance.get("/users/outgoing-friends-requests");
  // console.log("response.data in getOutgoingRequest : " ,response.data);
  return response.data;
};  
export const getFriendrequests = async () => {
  const response = await axiosInstance.get("/users/friend-requests");
  // console.log("response.data in getOutgoingRequest : " ,response.data);
  return response.data;
};  
export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(
    `/users/outgoing-friends-requests/${userId}`
  );
  return response.data;
};
export const acceptFriendRequest = async (userId) => {
  const response = await axiosInstance.put(
    `/users/friend-request/${userId}/accept`
  );
  return response.data;
};
export const getStreamToken = async () => {
  const response = await axiosInstance.get(
    `chat/token`
  );
  return response.data;
};
