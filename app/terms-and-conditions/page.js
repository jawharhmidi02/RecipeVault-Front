import React from "react";

const page = () => {
  return (
    <div className="mx-auto mt-6 flex h-full w-full items-center justify-center">
      {/* Title */}

      <div className="mx-10 flex w-full flex-col items-center justify-center gap-10 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
          <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl">
            Terms & Conditions
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
        </div>
        <div className="font-lato flex w-full max-w-[1300px] flex-col justify-center gap-6 text-neutral-600">
          <span className="text-center">
            <span className="text-lg font-semibold">
              Please read the terms carefully before using the store or any of
              its services.
            </span>
            This agreement defines legally binding terms and conditions.
          </span>
          <span>
            RecipeVault is a community-driven platform designed to allow users
            to easily share and discover new recipes online. Whether you’re a
            professional chef or a home cook, RecipeVault offers a space to
            upload your favorite recipes, explore culinary creations from around
            the world, and connect with other food enthusiasts. Our mission is
            to build a global kitchen where everyone can contribute their
            knowledge and passion for food, making it accessible to all.
          </span>
          <section className="mb-6">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              Welcome to our Recipe Sharing Site. By accessing or using this
              website, you agree to these Terms and Conditions. Please read them
              carefully. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">2. Acceptance of Terms</h2>
            <p>
              By using our platform, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions
              and our Privacy Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">3. Use of the Platform</h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                This site provides a platform for users to share, discover, and
                save recipes.
              </li>
              <li>
                You agree to use the platform only for lawful purposes and in
                ways that do not infringe on the rights or restrict the use of
                others.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">4. User Responsibilities</h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                You are responsible for the content you post, including recipes,
                images, and comments.
              </li>
              <li>
                You agree not to post any harmful, offensive, or misleading
                content, and to respect other users.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              5. Content Ownership and License
            </h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                You retain ownership of the recipes and images you upload.
                However, by sharing content, you grant us a non-exclusive,
                royalty-free license to use, display, and distribute it on the
                platform.
              </li>
              <li>
                You agree not to post content that infringes on the copyrights
                or intellectual property rights of others.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">6. Intellectual Property</h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                All site content, including the design, logo, and code, is the
                property of the Recipe Sharing Site or its licensors.
              </li>
              <li>
                You may not reproduce or distribute any site content without
                permission.
              </li>
            </ul>
          </section>

          <section className="mb-6" id="privacy">
            <h2 className="text-lg font-semibold">7. Privacy</h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and protect your
                information.
              </li>
              <li>
                By using the platform, you consent to our data collection and
                usage practices.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              8. Limitation of Liability
            </h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                The Recipe Sharing Site is not responsible for any damages
                arising from the use of recipes or other content on the
                platform.
              </li>
              <li>
                We provide the platform “as is” and disclaim all warranties,
                express or implied.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">9. Modifications to Terms</h2>
            <ul className="ml-4 list-inside list-disc">
              <li>
                We reserve the right to update these Terms and Conditions at any
                time. Any changes will be effective immediately upon posting.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">10. Governing Law</h2>
            <p>These Terms and Conditions are governed by the laws.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
