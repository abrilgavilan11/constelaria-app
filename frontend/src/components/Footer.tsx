const Footer = () => {
  return (
    <footer className="w-full bg-primary-dark border-t border-primary-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Constelaria. Todos los derechos reservados.</p>
          <p className="mt-2 text-primary-light">Explorando los misterios del cosmos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
