"use client";

import { useEffect } from "react";
import Link from "next/link";
import s from "./status-page.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wrap page">
      <div className={s.box}>
        <p className={s.code}>Something went wrong</p>
        <h1 className={s.title}>This page didn&apos;t load properly</h1>
        <p className={s.copy}>
          Something on my end tripped up while loading this page. Give it another go, and if it keeps
          happening, one of the usual routes below will get you where you were headed.
        </p>
        <p className={s.home}>
          <button type="button" onClick={() => reset()} className="btn btn-primary">Try again</button>
          <Link href="/" className="btn">Home page</Link>
          <Link href="/cards" className="btn">Compare cards</Link>
        </p>
      </div>
    </div>
  );
}
