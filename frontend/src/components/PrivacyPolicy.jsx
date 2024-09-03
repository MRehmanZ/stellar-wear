import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your privacy is important to us. This privacy policy explains what personal data we collect from you, how we use it, and your rights regarding your data.
          </p>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p className="mt-2">
              We collect the following types of information:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Payment details (Payment method, transaction details, etc.)</li>
              <li>Usage data (IP address, browser type, pages visited, etc.)</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use your information to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Process and manage your orders.</li>
              <li>Improve our products and services.</li>
              <li>Communicate with you regarding your account or transactions.</li>
              <li>Provide customer support.</li>
              <li>Send you promotional offers and updates (you can opt-out anytime).</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
            <p className="mt-2">
              We do not share your personal information with third parties except:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>When required by law.</li>
              <li>With trusted partners who assist us in operating our website and services, provided they agree to keep your information confidential.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
            <p className="mt-2">
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet is completely secure, and we cannot guarantee its absolute security.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">5. Your Rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal data. You can also object to or restrict the processing of your data, and request a copy of your data in a structured format.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this policy periodically for any changes.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">7. Contact Us</h2>
            <p className="mt-2">
              If you have any questions or concerns about this privacy policy, please contact us at <a href="mailto:info@example.com" className="underline text-primary">info@example.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
