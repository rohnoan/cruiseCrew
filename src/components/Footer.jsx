const Footer = () => {
    return (
      <footer className="bg-[#4a089a] bg-gradient-to-r from-[#7DD6FF] text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold">Your Brand</h2>
            <p className="text-sm opacity-80 mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
            <p className="text-sm opacity-80">Privacy Policy | Terms of Service</p>
          </div>
          <nav className="space-y-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
          <div>
            <h3 className="text-lg font-semibold">Connect with Us</h3>
            <p className="text-sm opacity-80">Follow us on social media for updates.</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="hover:opacity-75">🔵 Facebook</a>
              <a href="#" className="hover:opacity-75">📷 Instagram</a>
              <a href="#" className="hover:opacity-75">🐦 Twitter</a>
              <a href="#" className="hover:opacity-75">🎥 YouTube</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm opacity-70">
          Designed by Your Brand | Built with Love ❤️
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
  