import { Menu } from "./Menu";

export function Layout({ children }) {
  return (
    <div className="ui container">
      <Menu />
      {children}
    </div>
  );
}
