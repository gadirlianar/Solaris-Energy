"use client";

import React, { useState, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.location.search.includes("motion-debug");
}

function getServerSnapshot() {
  return false;
}

export function MotionDebug() {
  const isDebugParam = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [closed, setClosed] = useState(false);
  const [effects, setEffects] = useState({
    intro: true,
    parallax: true,
    heroEnergy: true,
    tilt: true,
    cursor: true,
    drawSVG: true,
  });

  if (!isDebugParam || closed) return null;

  return (
    <aside
      className="fixed bottom-4 right-4 z-[99999] bg-neutral-900/90 text-white p-4 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10 text-xs w-64"
      aria-label="Motion Debug Panel"
    >
      <div className="flex items-center justify-between mb-3 font-semibold text-[#E4F86E]">
        <span>MOTION DEBUG</span>
        <button
          onClick={() => setClosed(true)}
          className="text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(effects).map(([key, val]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <input
              type="checkbox"
              checked={val}
              onChange={(e) =>
                setEffects((prev) => ({ ...prev, [key]: e.target.checked }))
              }
              className="accent-[#E4F86E]"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-white/50">
        Solaris Creative Motion Engine
      </div>
    </aside>
  );
}
