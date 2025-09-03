
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
            <p>
                Atravelikes ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
                We may collect personal information that you provide to us directly, such as your name, email address, phone number, and payment information when you create an account or make a booking. We also collect non-personal information, such as browser type, operating system, and usage details.
            </p>

            <h3>2. How We Use Your Information</h3>
            <p>
                We use the information we collect to:
            </p>
            <ul>
                <li>Provide, operate, and maintain our Services.</li>
                <li>Process your transactions and manage your bookings.</li>
                <li>Improve, personalize, and expand our Services.</li>
                <li>Communicate with you, including for customer service and promotional purposes.</li>
                <li>Comply with legal obligations.</li>
            </ul>

            <h3>3. Sharing Your Information</h3>
            <p>
                We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>
            
            <h3>4. Data Security</h3>
            <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
            </p>

            <h3>5. Your Data Rights</h3>
            <p>
                Depending on your location, you may have rights under data protection laws, including the right to access, correct, or delete your personal information. Please contact us to exercise these rights.
            </p>

             <h3>6. Contact Us</h3>
            <p>
                If you have any questions about this Privacy Policy, please contact us through our website's contact form.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
