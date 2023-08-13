import { CustomReactMarkdown } from "../../../CustomReactMarkdown";
import { HomeJson } from "./homeJson";

export const Home = ({
  homeJson,
}: {
  homeJson: HomeJson
}) => {
  return (
    <>
      <h1>{homeJson.site_title}</h1>
      <CustomReactMarkdown>{homeJson.site_description}</CustomReactMarkdown>
    </>
  )
};
