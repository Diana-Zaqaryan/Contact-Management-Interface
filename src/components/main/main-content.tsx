interface MainContentProps {
  children: React.ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="main-content">
      <div className="main-content-inner">{children}</div>
    </div>
  )
}

export default MainContent
