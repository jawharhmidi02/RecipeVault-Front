import React from 'react'
import './page.css'

const page = () => {
  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white rounded-lg shadow-md max-w-3xl p-8">
        <h1>Terms and Conditions</h1>

        <section className="mb-6">
          <h2>1. Introduction</h2>
          <p>Welcome to our Recipe Sharing Site. By accessing or using this website, you agree to these Terms and Conditions. Please read them carefully. If you do not agree, please do not use our services.</p>
        </section>

        <section className="mb-6">
          <h2>2. Acceptance of Terms</h2>
          <p>By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
        </section>

        <section className="mb-6">
          <h2>3. Use of the Platform</h2>
          <ul className="list-disc list-inside ml-4">
            <li>This site provides a platform for users to share, discover, and save recipes.</li>
            <li>You agree to use the platform only for lawful purposes and in ways that do not infringe on the rights or restrict the use of others.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>4. User Responsibilities</h2>
          <ul className="list-disc list-inside ml-4">
            <li>You are responsible for the content you post, including recipes, images, and comments.</li>
            <li>You agree not to post any harmful, offensive, or misleading content, and to respect other users.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>5. Content Ownership and License</h2>
          <ul className="list-disc list-inside ml-4">
            <li>You retain ownership of the recipes and images you upload. However, by sharing content, you grant us a non-exclusive, royalty-free license to use, display, and distribute it on the platform.</li>
            <li>You agree not to post content that infringes on the copyrights or intellectual property rights of others.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>6. Intellectual Property</h2>
          <ul className="list-disc list-inside ml-4">
            <li>All site content, including the design, logo, and code, is the property of the Recipe Sharing Site or its licensors.</li>
            <li>You may not reproduce or distribute any site content without permission.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>7. Privacy</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.</li>
            <li>By using the platform, you consent to our data collection and usage practices.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>8. Limitation of Liability</h2>
          <ul className="list-disc list-inside ml-4">
            <li>The Recipe Sharing Site is not responsible for any damages arising from the use of recipes or other content on the platform.</li>
            <li>We provide the platform “as is” and disclaim all warranties, express or implied.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>9. Modifications to Terms</h2>
          <ul className="list-disc list-inside ml-4">
            <li>We reserve the right to update these Terms and Conditions at any time. Any changes will be effective immediately upon posting.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>10. Governing Law</h2>
          <p>These Terms and Conditions are governed by the laws.</p>
        </section>
      </div>
    </div>
  )
}

export default page