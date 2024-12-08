"use client";
import { useEffect, useState } from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import styled from "styled-components";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import { User } from "@prisma/client";
import { useLoading } from "@/context/loading-context";
import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { NotAuthorized } from "@/components/NotAuthorized";
import moment from "moment";
import {
  MenuConnectButton,
  PagesWrapper,
  PageTitle,
  SectionWrapper,
  Wrapping,
} from "@/styles/app-common-styled";
import { NavSection } from "@/components/navbar";

export default function KYC() {
  const { connected, publicKey } = useAnalyzedWallet();

  const { setIsLoading } = useLoading();
  const [users, setUsers] = useState<Array<User>>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [earnings, setEarnings] = useState<number>(0);
  const usersPerPage = 10;

  // Calculate index of first and last user in the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Slice the users to display only the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (connected && publicKey) {
      // allowed address to access the users wallets
      const authorizedKeys = [
        "HifcJVRc6RRVFWDZd5HzrXtX92LBEMFXsejByNfuSw56",
        "ASVhQSuRrB9CqyR347kSJJihGZgWeqA1W5JmTBGmrPFw",
        "8FpZzzM6r4N4gXDfNMGAB49zMJDpgwK2PNwGtMGiYVYS",
        "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx",
      ];

      if (
        authorizedKeys
          .map((item) => item.toLowerCase())
          .includes(publicKey.toLowerCase())
      ) {
        setIsAuthorized(true);
      }
      setIsLoading(false);
      getData()
        .then(() => {})
        .catch(() => {});
    }
  }, [connected, publicKey, isAuthorized]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Users data:", data?.users);

      setUsers(data?.users);
    } catch (error) {
      console.log("Error:", error);
      throw new Error("Error fetching data");
    }
    setIsLoading(false);
  };

  const getEarnings = async (userId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/get-user-earnings/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Earnings: ", data?.earnings);

      setEarnings(data?.earnings);
    } catch (error) {
      console.log("Error:", error);
      throw new Error("Error fetching Earnings");
    }
    setIsLoading(false);
  };

  // Toggle row expansion
  const toggleRow = async (index: number, userId: number) => {
    setExpandedRows([]);
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((row) => row !== index)
        : [...prevExpandedRows, index]
    );

    await getEarnings(userId);
  };

  return (
    <SectionWrapper>
      <Wrapping>
        <NavSection />
        <PagesWrapper style={{ padding: "30px !important" }}>
          {connected ? (
            <div style={{ padding: "1rem" }}>
              {isAuthorized ? (
                <>
                  {currentUsers.length > 0 && (
                    <Container>
                      <PageTitle>PAiT Users </PageTitle>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>#</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Wallet</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Direct USDC</TableHeader>
                            <TableHeader>Direct PAiT</TableHeader>
                            <TableHeader>Earning</TableHeader>
                          </TableRow>
                        </TableHead>
                        <tbody>
                          {currentUsers
                            .filter((item) => item.name)
                            .map((user, index) => (
                              <React.Fragment key={index}>
                                <TableRow
                                  onClick={() => toggleRow(index, user.id)}
                                >
                                  <TableData>{index + 1}</TableData>
                                  <TableData>{user.name}</TableData>
                                  <TableData>{user.wallet}</TableData>
                                  <TableData>
                                    {user.email ? user.email : "N/A"}
                                  </TableData>
                                  <TableData style={{ textAlign: "center" }}>
                                    {user.direct_usdc ? user.direct_usdc : 0}
                                  </TableData>
                                  <TableData style={{ textAlign: "center" }}>
                                    {user.direct_pait ? user.direct_pait : 0}
                                  </TableData>
                                  <TableData>
                                    <div style={{ textAlign: "center" }}>
                                      <ChevronRightIcon />
                                    </div>
                                  </TableData>
                                </TableRow>
                                {expandedRows.includes(index) && (
                                  <ExpandableRow>
                                    <TableData colSpan={7}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: "1.8rem",
                                        }}
                                      >
                                        <p>
                                          <strong>
                                            Earning Today(
                                            {moment(new Date()).format(
                                              "YYYY/MM/DD"
                                            )}
                                            )
                                          </strong>
                                        </p>
                                        <p>USDC: ${` ${earnings}` || "0"}</p>
                                      </div>
                                    </TableData>
                                  </ExpandableRow>
                                )}
                              </React.Fragment>
                            ))}
                        </tbody>
                      </Table>

                      <Pagination>
                        <PageButton
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Prev
                        </PageButton>
                        {[...Array(totalPages).keys()].map((number) => (
                          <PageButton
                            key={number}
                            onClick={() => handlePageChange(number + 1)}
                            disabled={currentPage === number + 1}
                          >
                            {number + 1}
                          </PageButton>
                        ))}
                        <PageButton
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </PageButton>
                      </Pagination>
                    </Container>
                  )}
                </>
              ) : (
                <NotAuthorized />
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
              }}
            >
              <DynamicWidget
                innerButtonComponent={
                  <MenuConnectButton>Connect Wallet</MenuConnectButton>
                }
              />
            </div>
          )}
        </PagesWrapper>
      </Wrapping>
    </SectionWrapper>
  );
}

const ExpandableRow = styled.tr`
  background-color: #38393b;
  & > td {
    padding: 10px 15px;
  }
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 16px;
`;

const TableHead = styled.thead`
  padding: 12px 15px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  cursor: pointer;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  border: 1px solid #80dcd7;
  background-color: #343e56;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: #1c2130;
  }
`;
