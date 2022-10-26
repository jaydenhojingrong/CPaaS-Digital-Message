interface CpaasResponse {
    code: number;
    channels_sent: string[];
    channel_succeeded: object;
    channel_failed: object;
  }
  
   export { CpaasResponse };