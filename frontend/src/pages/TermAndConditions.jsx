const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== HEADER ===== */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-semibold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-600">Last updated: January 2026</p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 space-y-10">
          {/* INTRO */}
          <p className="text-gray-700 leading-relaxed">
            Welcome to <strong>LiwotoBlogs</strong>. By accessing or using our
            platform, you agree to be bound by these Terms and Conditions. If
            you do not agree with any part of these terms, please do not use the
            service.
          </p>

          {/* ELIGIBILITY */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You must be at least 13 years old to use LiwotoBlogs. By creating
              an account, you confirm that the information you provide is
              accurate and complete.
            </p>
          </div>

          {/* ACCOUNT RESPONSIBILITY */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Account Responsibility
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                You are responsible for maintaining the security of your account
              </li>
              <li>You must not share your login credentials</li>
              <li>You are responsible for all activity under your account</li>
            </ul>
          </div>

          {/* CONTENT OWNERSHIP */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Content Ownership
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You retain ownership of the content you publish on LiwotoBlogs. By
              publishing content, you grant us a non-exclusive license to
              display and distribute it on the platform.
            </p>
          </div>

          {/* ACCEPTABLE USE */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Acceptable Use
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Do not publish illegal, abusive, or harmful content</li>
              <li>Do not attempt to hack, scrape, or disrupt the platform</li>
              <li>Do not impersonate others or provide false information</li>
            </ul>
          </div>

          {/* TERMINATION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Account Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate
              these terms or misuse the platform, with or without notice.
            </p>
          </div>

          {/* LIMITATION OF LIABILITY */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              LiwotoBlogs is provided on an “as-is” basis. We are not
              responsible for any loss, data damage, or service interruption
              arising from the use of the platform.
            </p>
          </div>

          {/* MODIFICATIONS */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Changes to These Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms and Conditions at any time. Continued
              use of the platform after changes indicates acceptance of the
              updated terms.
            </p>
          </div>

          {/* GOVERNING LAW */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by and interpreted in accordance with the
              laws of India.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
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

export default TermsAndConditions;
