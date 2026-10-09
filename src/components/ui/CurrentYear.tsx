"use client";

import React from "react";

const emptySubscribe = () => () => {};

export function CurrentYear() {
  const year = React.useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return <>{year}</>;
}
