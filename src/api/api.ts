// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrl, networkAddress } from "../config/config";
import { NetworkTrustlineUpdateEvent } from "../features/events/types";
import { WalletCredentials } from "../features/types";
import { formatEventFromLib } from "../helper/helper";

type SendPaymentRequest = {
  receiverAddress: string;
  value: string | number;
  wallet: WalletCredentials;
};

type AcceptTrustlineRequest = {
  contactAddress: string;
  clGiven: string | number;
  clReceived: string | number;
  wallet: WalletCredentials;
};

type AcceptTrustlineResponse = {
  txHash: string;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseApiUrl}` }),
  endpoints: (builder) => ({
    sendPayment: builder.mutation<string, SendPaymentRequest>({
      query: ({ value, wallet, receiverAddress }) => ({
        url: "/payment",
        method: "POST",
        body: {
          networkAddress,
          receiverAddress,
          value,
          wallet,
        },
      }),
    }),
    requestTrustlines: builder.mutation<
      NetworkTrustlineUpdateEvent[],
      WalletCredentials
    >({
      query: (wallet) => ({
        url: "/trustline/request",
        method: "POST",
        body: {
          networkAddress,
          wallet,
        },
      }),
      transformResponse: (response: NetworkTrustlineUpdateEvent[]) =>
        response.map(formatEventFromLib),
    }),
    acceptTrustline: builder.mutation<
      AcceptTrustlineResponse,
      AcceptTrustlineRequest
    >({
      query: ({ contactAddress, clGiven, clReceived, wallet }) => ({
        url: "/trustline/accept",
        method: "POST",
        body: {
          networkAddress,
          contactAddress,
          clGiven,
          clReceived,
          wallet,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSendPaymentMutation,
  useRequestTrustlinesMutation,
  useAcceptTrustlineMutation,
} = api;
