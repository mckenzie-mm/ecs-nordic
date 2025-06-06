import Carousel from "../ui-client/carousel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Carousel />
        {children}
    </>
  )
}