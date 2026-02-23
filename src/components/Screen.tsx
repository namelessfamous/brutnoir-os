/**
 * brutnoir-os · Screen
 * Root OS shell — 100vw × 100vh
 * Composes: GlobalStyles, ScreenProvider, MenuBar, ScreenDock, Window renderer
 */

"use client";

import type { ReactNode, CSSProperties } from "react";
import { GlobalStyles } from "../tokens/GlobalStyles";
import { ScreenProvider, useScreen } from "../hooks";
import { MenuBar, type MenuBarItem } from "./MenuBar";
import { ScreenDock, type DockApp } from "./ScreenDock";
import { Window } from "./Window";
import { Notification } from "./Overlays";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScreenProps {
  children?: ReactNode;
  /** Custom CSS background (replaces default NF wallpaper) */
  wallpaper?: CSSProperties["background"];
  /** Extra items appended to the default menu bar */
  menuItems?: MenuBarItem[];
  /** Apps registered to the NF dock / start menu */
  dockApps?: DockApp[];
}

// ─── Internal desktop (must live inside ScreenProvider) ───────────────────────

function Desktop({ children, wallpaper, menuItems = [], dockApps = [] }: ScreenProps) {
  const { windows, notifications } = useScreen();

  return (
    <div className="nf-os-root" style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: wallpaper ?? `
        radial-gradient(ellipse at 20% 80%, rgba(200,245,60,0.04) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(232,35,58,0.04) 0%, transparent 60%),
        #0a0a0b
      `,
    }}>
      <MenuBar items={menuItems} />

      {/* Desktop workspace */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}

        {/* Render managed windows */}
        {windows
          .filter((w) => !w.minimized)
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((win) => (
            <Window key={win.id} {...win} />
          ))}
      </div>

      <ScreenDock apps={dockApps} />

      {/* Notification stack */}
      <div style={{
        position: "fixed",
        bottom: 56,
        right: 12,
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}>
        {notifications.map((n) => (
          <Notification
            key={n.id}
            title={n.title}
            message={n.message}
            variant={n.variant}
            style={{ pointerEvents: "all" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Screen (public API) ──────────────────────────────────────────────────────

export function Screen(props: ScreenProps) {
  return (
    <ScreenProvider>
      <GlobalStyles />
      <Desktop {...props} />
    </ScreenProvider>
  );
}
