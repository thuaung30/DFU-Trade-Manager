import { Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Landing: React.FC = () => {
  const accountAddress = useAppSelector(
    (state) => state.account.selectedAccountAddress
  );
  const account = useAppSelector(
    (state) => state.account.data[accountAddress!]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!!account && !isEmpty(account)) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Text my={16} align="center" color="blue.500" fontSize="6xl">
        DFU Trade Manager
      </Text>
      <Text color="grey" align="center">
        To make payments, you first need to create a trustline with a partner.
      </Text>
      <Text color="grey" mb={8} align="center">
        Each trustline also connects you to friends of friends so you can pay
        anyone in your network.
      </Text>
      <Link to="/login">
        <Text align="center" color="blue.500">
          Login
        </Text>
      </Link>
    </>
  );
};

export default Landing;
