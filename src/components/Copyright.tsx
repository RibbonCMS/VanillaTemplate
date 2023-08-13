import Link from "next/link"
import { ConfigJson } from "./pages/configJson"

export const Copyright = (
  {
    config
  }: {
    config: ConfigJson
  }
) => {
  return (
    <>
      <hr />
      <div style={{ textAlign: "center" }}>
        {'Copyright © '}
        <Link
          href={config.copylight_url}
          target="_blank"
          rel="noopener"
        >
          {config.copylight_name}
        </Link>
        {' '}
        {new Date().getFullYear()}.
      </div>
    </>
  )
}