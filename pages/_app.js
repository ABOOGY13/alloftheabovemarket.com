import Link from "next/link";

function Layout({ children }) {
  return (
    <div>
      <header style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
        <h2>AOTA Marketplace</h2>
        <nav style={{ display: "flex", gap: 15 }}>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/raffles">Raffles</Link>
        </nav>
      </header>

      <main style={{ padding: 20 }}>{children}</main>

      <footer style={{ padding: 20, borderTop: "1px solid #ddd" }}>
        © {new Date().getFullYear()} AOTA Marketplace
      </footer>
    </div>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
