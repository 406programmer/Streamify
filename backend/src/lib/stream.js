import {StreamChat} from 'stream-chat';
import 'dotenv/config';

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const streamClient = StreamChat.getInstance(api_key,api_secret);
export const upsertStreamUser = async(userData)=>{
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error('Error creating/updating Stream user:', error);
    }
}
export const generateStreamToken = (userId)=>{
    try {
        const token = streamClient.createToken(userId);
        return token;

    } catch (error) {
        console.error('Error generating Stream token:', error);
    }
};