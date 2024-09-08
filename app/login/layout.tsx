import ScrollTopLayout from "./context/scrollTopLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ScrollTopLayout>{children}</ScrollTopLayout>;
}
