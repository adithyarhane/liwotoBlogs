const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== HEADER ===== */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600">Last updated: January 2026</p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 space-y-10">
          {/* INTRO */}
          <p className="text-gray-700 leading-relaxed">
            At <strong>LiwotoBlogs</strong>, your privacy is important to us.
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our platform.
          </p>

          {/* INFORMATION WE COLLECT */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Personal information such as name and email address</li>
              <li>Account authentication data</li>
              <li>Content you create, publish, or save</li>
              <li>Usage data to improve our services</li>
            </ul>
          </div>

          {/* HOW WE USE */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To create and manage your account</li>
              <li>To provide publishing and reading features</li>
              <li>To improve platform performance and usability</li>
              <li>To communicate important updates</li>
            </ul>
          </div>

          {/* DATA SHARING */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Sharing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or rent your personal data. Your information may
              only be shared with trusted services required to operate the
              platform, such as cloud storage or authentication services.
            </p>
          </div>

          {/* DATA SECURITY */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security practices, including
              encrypted authentication and protected APIs, to keep your data
              safe.
            </p>
          </div>

          {/* COOKIES */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cookies & Authentication
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies or secure tokens only for authentication and
              session management. These are essential for platform
              functionality.
            </p>
          </div>

          {/* USER RIGHTS */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Control published and saved content</li>
            </ul>
          </div>

          {/* CHANGES */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated revision date.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, you can
              contact us at:
            </p>
            <p className="mt-2 font-medium text-gray-900">
              support@LiwotoBlogs.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
