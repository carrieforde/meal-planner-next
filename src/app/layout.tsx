/* eslint-disable @next/next/no-page-custom-font */
import { ApolloWrapper } from "lib/graphql/apollo-wrapper";
import "./styles.css";
import { AlertProvider } from "lib";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Libre+Franklin:ital,wght@0,300;0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <ApolloWrapper>
          <AlertProvider>{children}</AlertProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
