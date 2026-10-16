interface FooterProps {
  children: React.ReactNode;
}

function Footer({ children }: FooterProps) {
  return <footer className="footer">{children}</footer>;
}

export default Footer;
