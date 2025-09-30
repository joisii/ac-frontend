const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand + About */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
            <img
              src="https://img.icons8.com/ios-filled/50/admin-settings-male.png"
              alt="GVJ Logo"
              className="w-10 h-10 drop-shadow-md"
            />
            <span className="text-xl font-extrabold text-white tracking-wide">
              GVJ Aircon
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
            Delivering exceptional air conditioning services and solutions with integrity since 2020.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-white text-lg font-bold mb-4 border-b border-gray-600 pb-2 inline-block">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { name: 'Training', link: '/services' },
              { name: 'Sales', link: '/sales' },
              {
                name: 'more about us',
                link: 'https://www.google.com/search?q=Gvj+Aircon+Projects+and+services+%2C+No+37+Rathinavel+Pa+diyan+Street%2C+Golden+George+Nagar%2C+Neekundram%2C+chennai+600107&rlz=1C1ONGR_enIN1123IN1124&oq=gvj+ai&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBggCEEUYO9IBCDMwNTJqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8',
              },
            ].map(({ name, link }, idx) => (
              <li key={idx}>
                <a
                  href={link}
                  target={link.startsWith('http') ? '_blank' : '_self'}
                  rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:text-white transition duration-300 ease-in-out opacity-80 hover:opacity-100"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact + Legal */}
        <div className="text-center md:text-left">
          <h4 className="text-white text-lg font-bold mb-4 border-b border-gray-600 pb-2 inline-block">
            Connect with us
          </h4>

          {/* Phone Numbers */}
          <div className="mb-4 text-sm text-gray-400">
            <p>📞 <a href="tel:9677001010" className="hover:text-white">9677001010</a></p>
            <p>📞 <a href="tel:9551621171" className="hover:text-white">9551621171</a></p>
          </div>

          <p className="text-xs text-gray-500 tracking-wide">
            &copy; 2025 GVJ Aircon Projects and Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
