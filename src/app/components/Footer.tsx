export default function Footer() {
    return ( 
<footer className="bg-gray-800 text-gray-200 mt-12">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* About / Logo */}
    <div className="flex flex-col items-start">
      <h2 className="text-2xl font-bold text-white mb-4">MyShop</h2>
      <p className="text-gray-400">
        Your one-stop shop for toys, games, and more. Fun for all ages!
      </p>
    </div>

    {/* Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="hover:text-white transition">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Categories</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Products</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Contact</a>
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact</h3>
      <p>Email: support@myshop.com</p>
      <p>Phone: +91 1234 567 890</p>
      <p>Address: 123 Market Street, India</p>
    </div>

  </div>

  {/* Bottom Copyright */}
  <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
    &copy; {new Date().getFullYear()} MyShop. All rights reserved.
  </div>
</footer>
    );
}