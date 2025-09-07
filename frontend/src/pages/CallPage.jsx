import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/UseAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export default function CallPage() {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;
      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });
        const videoCallInstance = videoClient.call("default", callId);
        await videoCallInstance.join({ create: true });
        console.log("joined call successfully");
        setCall(videoCallInstance);
        setClient(videoClient);
      } catch (error) {
        console.log("Error joining call : ", error);
        toast.error("Count not join call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };
    initCall();
  }, [tokenData, authUser, callId]);
  if (isLoading || isConnecting) return <PageLoader />;
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamTheme>
              <StreamCall call={call}>
                <CallContent/>
              </StreamCall>
            </StreamTheme>
          </StreamVideo>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
const CallContent = ()=>{
  const{useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();
  if(callingState===CallingState.LEFT) navigate("/");

  return <StreamTheme>
    <SpeakerLayout/>
    <CallControls/>
  </StreamTheme>
}
