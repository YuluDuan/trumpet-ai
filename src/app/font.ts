import { Quicksand, Roboto } from "next/font/google";

export const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  weight: ['400', '700', '500'],
  subsets: ['latin'],
  display: "swap",
});