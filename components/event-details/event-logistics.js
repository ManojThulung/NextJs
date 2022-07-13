import Image from "next/image";
import LogisticsItem from "./logistics-item";
import DaetIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import classes from "./event-logistics.module.css";

function EventLogistics(props) {
  const { date, image, address, alt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addressText = address.replace(",", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={alt} width={460} height={460} />
        {/* <img src={`/${image}`} alt={alt} /> */}
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DaetIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
