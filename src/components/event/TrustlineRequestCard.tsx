import { Stack, Box, Text, Center, Tag, TagLabel } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React from "react";
import { useAcceptTrustlineMutation } from "../../api/api";
import { useAppSelector } from "../../app/hooks";
import { getTrustlineUpdateOfCurrentRequest } from "../../features/events/select";
import { NetworkTrustlineUpdateEvent } from "../../features/events/types";
import { WalletCredentials } from "../../features/types";
import AlertCard from "../AlertCard";
import Header from "../Header";
import RoundButton from "../RoundButton";

interface TrustlineRequestCardProps {
  event: NetworkTrustlineUpdateEvent;
  wallet: WalletCredentials;
}

const TrustlineRequestCard: React.FC<TrustlineRequestCardProps> = ({
  event,
  wallet,
}) => {
  const given = event.from === event.user;
  const [acceptTrustline, { isLoading, isError }] =
    useAcceptTrustlineMutation();
  const trustlineUpdate = useAppSelector(
    getTrustlineUpdateOfCurrentRequest(event)
  );
  const accepted = !isEmpty(trustlineUpdate);

  const onClickAccept = async () => {
    await acceptTrustline({
      contactAddress: event.counterParty,
      clGiven: event.received as number,
      clReceived: event.given as number,
      wallet,
    });
  };

  return (
    <Stack mb={2}>
      <Header title={event.type} backButton={true} />
      {isError && <AlertCard message="Something went wrong." />}
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="md" color="grey">
          Partner
        </Text>
        <Text>{event.counterParty}</Text>
        <Text fontSize="md" color="grey">
          Currency Network
        </Text>
        <Text>MMK Burmese Kyats</Text>
        <Text fontSize="md" color="grey">
          Give Credit Line
        </Text>
        {given ? (
          <Text>{`${event.given} MMK`}</Text>
        ) : (
          <Text>{`${event.received} MMK`}</Text>
        )}
        <Text fontSize="md" color="grey">
          Receive Credit Line
        </Text>
        {given ? (
          <Text>{`${event.received} MMK`}</Text>
        ) : (
          <Text>{`${event.given} MMK`}</Text>
        )}
      </Box>
      {given ? null : accepted ? (
        <Center>
          <Tag
            _hover={{ cursor: "pointer" }}
            my={2}
            size="sm"
            variant="outline"
            colorScheme="blue"
          >
            <TagLabel>Accepted</TagLabel>
          </Tag>
        </Center>
      ) : (
        <RoundButton onClick={onClickAccept} isLoading={isLoading}>
          Accept
        </RoundButton>
      )}
    </Stack>
  );
};

export default TrustlineRequestCard;
