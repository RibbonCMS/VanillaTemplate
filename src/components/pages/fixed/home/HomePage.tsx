import { HomeJson } from "./homeJson";

export const HomePage = ({
  homeJson,
}: {
  homeJson: HomeJson
}) => {
  return (
    <>
      <h1>HomePage</h1>
      <div>{homeJson.hoge}</div>
    </>
  )
};
