import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommandedUsers, getMyFriends ,sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } from '../controllers/user.controller.js';

const router = express.Router();

//apply auth middleware to all the routes defined in this file
router.use(protectRoute);

router.get('/',getRecommandedUsers);
router.get('/friends',getMyFriends);
router.post('/outgoing-friends-requests/:id',sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);
// router.put('/friend-request/:id/reject',rejectFriendRequest);
router.get('/friend-requests',getFriendRequests);
router.get('/outgoing-friends-requests',getOutgoingFriendRequests);

//,update profile routes ,reject friend request routes can be added here


export default router;