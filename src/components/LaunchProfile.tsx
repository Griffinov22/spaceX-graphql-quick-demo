import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useLaunchProfileQuery } from "../generated/graphql-types";

const LaunchProfile = () => {
  const { launchId } = useParams<{ launchId: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useLaunchProfileQuery({
    variables: { id: launchId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { mission_name: name, launch_date_local: launchDate, launch_site, rocket, details, telemetry } = data!.launch!;
  return (
    <div>
      <h1>
        <span style={{ fontStyle: "italic", opacity: 0.7 }}>Mission Name: </span>
        {name}
      </h1>
      <Table>
        <thead>
          <tr>
            <TH>Launch Date</TH>
            <TH>Launch Site</TH>
            <TH>Rocket</TH>
            <TH>Details</TH>
            <TH>Telemetry</TH>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TD>{launchDate ?? "no launch date set"}</TD>
            <TD>{launch_site?.site_name ?? "site unavailable"}</TD>
            <TD>
              <div
                style={{
                  display: "flex",
                  columnGap: "0.5rem",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                <p style={{ padding: 0 }}>{rocket?.rocket_name ?? "rocket name unavailable"}</p>{" "}
                {rocket?.rocket_type && (
                  <>
                    <p style={{ padding: 0 }}>|</p> <RocketType>{rocket.rocket_type}</RocketType>
                  </>
                )}
              </div>
            </TD>
            <TD>{details ?? "details unavailable"}</TD>
            <TD>{telemetry?.flight_club ?? "telemetry unavailable"}</TD>
          </tr>
        </tbody>
      </Table>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

const Table = styled.table`
  border-collapse: collapse;
  border: 2px solid white;
  margin-bottom: 5rem;
`;
const TD = styled.td`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  max-width: 200px;
  border-right: 2px solid white;
  &:last-of-type {
    border-right: none;
  }
`;
const TH = styled.th`
  font-size: 1.4rem;
  font-weight: bolder;
  border-right: 2px solid white;
  padding: 6px 32px;
`;
const RocketType = styled.span`
  display: inline-block;
  padding: 2px 16px;
  background-color: yellow;
  border-radius: 50vw;
  color: black;
  font-weight: bolder;
`;

export default LaunchProfile;
