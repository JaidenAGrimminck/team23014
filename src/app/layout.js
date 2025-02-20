import { Geist, Geist_Mono, Krona_One, Rubik_Mono_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Flying Dutchman, #23014",
  description: "FIRST Tech Challenge team #23014, The Flying Dutchman from the Netherlands, is a team of 15 students from the American School of The Hague.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#0a0a0a"
        }}
      >
        {children}
      </body>
    </html>
  );
}
