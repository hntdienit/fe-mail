import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Link href={"/"} className={""}>
        <Image src="/Bizzi-Logo-300x103.png" alt="logo-bizzi" width={150} height={51.5} />
      </Link>
    </div>
  );
};

export default Logo;
