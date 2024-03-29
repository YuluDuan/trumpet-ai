import ModalProvider from "@/providers/ModalProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";

import "@/sass/main.scss";
import "@radix-ui/themes/styles.css";
import { ReduxProvider } from "@/store/provider";
import { quicksand } from "./font";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={quicksand.className}>
        <body>
          <Theme>
            <ReduxProvider>
              <ModalProvider />
              <main className={quicksand.className}>{children}</main>
            </ReduxProvider>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
