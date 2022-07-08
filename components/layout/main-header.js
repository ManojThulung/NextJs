import Link from "next/link";
import classes from "./main-header.module.css";

function MainHeader(props) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvent</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browser All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
