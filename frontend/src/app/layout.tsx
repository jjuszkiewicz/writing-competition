import type { Metadata } from "next";
import { roboto } from "../styles/fonts";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Writing competition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <div className="main-container">{children}</div>
      </body>
    </html>
  );
}
