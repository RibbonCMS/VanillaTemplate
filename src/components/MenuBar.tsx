import Link from "next/link"

const menuBarStyle = {
  display: "flex",
  padding: "1rem",
  borderBottom: "1px solid #d3d3d3",
  marginBottom: "1rem"
}

const menuBarItemStyle = {
  marginRight: "1rem"
}

export const MenuBar = () => {
  return (
    <>
      <div style={menuBarStyle}>
        <div style={menuBarItemStyle}>
          <Link href={`/`} passHref>Home</Link>
        </div>
        <div>
          <Link href={`/articles`} passHref>Articles</Link>
        </div>
      </div >
    </>
  )
}