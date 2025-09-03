
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
            
            <p>
                Welcome to Atravelikes! These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>

            <h3>1. Use of Our Services</h3>
            <p>
                You must be at least 18 years old to use our Services. You agree to use our Services in compliance with all applicable laws and regulations and not for any unlawful purpose. You are responsible for maintaining the confidentiality of your account and password.
            </p>

            <h3>2. Bookings and Payments</h3>
            <p>
                All bookings for flights, hotels, and other travel services are subject to the terms and conditions of the respective providers. Atravelikes acts as an intermediary. All payments are processed through secure third-party payment gateways. We are not responsible for any issues arising from the payment process.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
                All content on our Services, including text, graphics, logos, and software, is the property of Atravelikes or its content suppliers and is protected by international copyright laws.
            </p>

            <h3>4. Limitation of Liability</h3>
            <p>
                To the fullest extent permitted by law, Atravelikes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of our Services.
            </p>

            <h3>5. Changes to Terms</h3>
            <p>
                We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h3>6. Contact Us</h3>
            <p>
                If you have any questions about these Terms, please contact us through our website's contact form.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
