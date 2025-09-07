import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

//user that are not friends of user and user itself
export  const getRecommandedUsers = async (req, res) => {
  try {
    
    const currentuserId = req.user._id; // can also write req.user.id
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const recommendedUser = await User.find({
      _id: {
        $ne: currentuserId,
        $nin: currentUser.friends,
      },
      isOnBoarded: true,                        
    });
   
    //can also right it as this
    // const recommendedUser = await User.find({
    //   $and: [
    //     { _id: { $ne: currentuserId } },
    //     { _id: { $nin: currentUser.friends } },
    //     { isOnBoarded: true },
    //   ],
    // });

    res.status(200).json(recommendedUser);
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//detail of user friends
export const getMyFriends = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select('friends').populate('friends','fullName nativeLanguage learningLanguage profilePic');
        // console.log("users that are friends with current user : " ,user.friends);
        res.status(200).json(user.friends);

    } catch (error) {
        console.error('Error fetching friends:',error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

//create friend request in db and return that entry
export const sendFriendRequest = async (req,res)=>{
 try {
  
    const userId = req.user._id;//yaaha hum req.user isiliye acceess kr paa rhe h jo ki current user h kyuki ye protectedmiddleware ne req.user me current user add kiya h 
    const {id : recipientId}= req.params;
    // console.log(typeof userId); //ye object h 
    // console.log(typeof recipientId);// ye string h

    //prevent sending request to oneself
    if (userId.toString() === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send friend request to yourself" });
    }
    const recipient = await User.findById(recipientId);
    if(!recipient){
        return res.status(404).json({message:"Recipient not found"});
    }
    //check if already friends
    if(recipient.friends.includes(userId)){
        return res.status(400).json({message:"You are already friends with this user"});
    }
    //check if a friend request is already sent
    const existingRequest = await FriendRequest.findOne({
        $or:[
            {sender:userId,recipient:recipientId},
            {sender:recipientId,recipient:userId},
        ],
    });
    if(existingRequest){
        return res.status(400).json({message:"A friend request is already pending between you and this user"});
    }

    //create new friend request entry in db
    const friendRequest = new FriendRequest({
        sender:userId,
        recipient:recipientId,
    });
    await friendRequest.save();
    console.log("friendRequest : " ,friendRequest);
    res.status(201).json(friendRequest);
 } catch (error) {
    console.error('Error sending friend request:',error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
 }
}

//accepts friend request and update recipient , sender friend's list
export const acceptFriendRequest = async (req,res)=>{
    try {
        const {id : senderId}= req.params;
        const friendRequest = await FriendRequest.findById(senderId);

        console.log("friendRequest object in acceptFriendRequest : ",friendRequest);

        if(!friendRequest){
            return res.status(404).json({message:"Friend request not found"});
        }

         // verify that the current user is the recipient of the friend request
         console.log(typeof friendRequest.recipient);
         console.log("friendRequest.recipient : ", friendRequest.recipient);
         console.log(typeof req.user.id);
         console.log("req.user : ", req.user);
        if(friendRequest.recipient.toString() != req.user._id){
            return res.status(403).json({message:"You are not authorized to accept this friend request"});
        }

        friendRequest.status='accepted';
        await friendRequest.save();

        //update both users' friends list
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends:friendRequest.sender} //addToSet adds the value to the array only if it doesn't already exist
        });
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.recipient}
        });
        res.status(200).json({message:"Friend request accepted"});
    } catch (error) {
        console.error('Error accepting friend request:',error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}
//return two field object incomingRequests where current user is recipent and acceptedRequests where sender is current user and status is accepted 
export const getFriendRequests = async (req,res)=>{
  try {
    const incomingRequests = await FriendRequest.find({
        recipient:req.user._id,
        status:'pending'
    }).populate('sender','fullName nativeLanguage learningLanguage profilePic');

    const acceptedRequests = await FriendRequest.find({
        sender:req.user._id,
        status:'accepted'
    }).populate('recipient','fullName profilePic');
    res.status(200).json({incomingRequests,acceptedRequests});
  } catch (error) {
    console.error('Error fetching friend requests:',error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
  }
}

// return object where sender is current user and status is pending used in home page for disallowing user to send multiple request to same user
export const getOutgoingFriendRequests = async (req,res)=>{
    try {
      const outgoingRequests = await FriendRequest.find({
          sender:req.user._id,
          status:'pending'
      }).populate('recipient','fullName nativeLanguage learningLanguage profilePic');
  
      res.status(200).json(outgoingRequests);
    } catch (error) {
      console.error('Error fetching outgoing friend requests:',error);
      res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}



