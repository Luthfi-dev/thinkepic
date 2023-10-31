export const metadata = {
  title: "Thinkepic",
  description: "epic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
