export interface UserProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    sender: string
    postCount: number,
    index: number,
    selectedIndex: number
  }