/* eslint-disable @typescript-eslint/no-unused-vars */

export const RingIncomingCall = () => {
   const sound = new Audio('../../../assets/audio/ringring.mp3');
    sound.loop = true;
  
   const startRinging = () => {
    sound.play();
  };

  const stopRinging = () => {
    sound.pause();
    sound.currentTime = 0;
  };

  return { startRinging, stopRinging };
}