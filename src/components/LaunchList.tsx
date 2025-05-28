import { Navigate, useNavigate } from "react-router";
import styled from "styled-components";
import { useLaunchesQuery } from "../generated/graphql-types";

const LaunchList = () => {
  const { data, loading, error } = useLaunchesQuery();
  const navigate = useNavigate();

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <Navigate to="/" />;

  return (
    <>
      <h1>SpaceX Launches</h1>
      <LaunchUL>
        {data.launches &&
          data.launches.map((launch) => {
            return (
              <LaunchLi
                key={launch!.id}
                onClick={() => navigate("launches/" + launch!.id)}
              >
                {launch?.mission_name ?? "Mission name missing"}
              </LaunchLi>
            );
          })}
      </LaunchUL>
    </>
  );
};
export default LaunchList;

const LaunchUL = styled.ul`
  list-style: none;
  font-size: 3rem;
  font-style: italic;
  font-family: system-ui;
`;

const LaunchLi = styled.li`
  padding: 2rem;
  text-align: left;
  &:hover {
    background-color: black;
  }
  transition: all 250ms ease-in-out;
  border: 1px solid white;
  border-bottom: none;
  &:last-of-type {
    border-bottom: 1px solid white;
  }
  cursor: pointer;
`;
