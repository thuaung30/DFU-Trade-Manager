import { NetworkTrustlineUpdateEvent } from "../events/types";

export type TrustlineRequest = NetworkTrustlineUpdateEvent;

export type TrustlineRequests = NetworkTrustlineUpdateEvent[];

export type TrustlineRequestsNormalized = {
  [requestId: string]: TrustlineRequest;
};
