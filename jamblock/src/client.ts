import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const client = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const clientId = createThirdwebClient({
  clientId: client,
});
