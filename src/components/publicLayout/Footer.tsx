export function Footer(): JSX.Element {
  const today = new Date();
  return (
    <footer className='footer footer-center p-4 text-base-content mt-6 bg-base-300'>
      <div>
        <p>© {today.getFullYear()} Sori883</p>
      </div>
    </footer>
  );
}