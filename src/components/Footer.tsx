export function Footer() {
  const year = new Date().getFullYear();
  return (
    <p className="note">
      &copy; <a href="https://github.com/larsewi">larsewi</a> {year}
    </p>
  );
}
