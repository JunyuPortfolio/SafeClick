import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="pricing-page">
      <div className="navbar">
       <h2 style={{ fontWeight: 'bold' }}>Safe Click</h2>
        <Link to="/" className="btn-outline">Back to Home</Link>
      </div>
        <h2 className="pricing-title">Terms of Service</h2>
        <i>Effective Date: April 11, 2025</i>
        <div className="terms-content">
            <p>Welcome to SafeClick! These Terms of Service ("Terms") and 
                Privacy Policy govern your use of our website and services.
                By using SafeClick, you agree to these Terms. If you do not 
                agree, please do not use our site.</p>
            <h3>Our Service</h3>
            <p>SafeClick provides a tool to help users check the safety of URLs and files using AI-based analysis. It is meant for informational and educational purposes only and is not a replacement for professional cybersecurity tools or advice.</p>
            <h3>User Responsibilities</h3>
            <ol>
                <li>You agree to use SafeClick only for lawful purposes.
                </li>
                <li>You must not upload malicious, illegal, or harmful content.
                </li>
                <li>You are responsible for any content you submit through the service.
                </li>
            </ol>
            <h3>Privacy and Data</h3>
            <p>We respect your privacy. Uploaded files and URLs may be processed by our AI system for analysis, but we do not store or share your submissions unless explicitly stated.</p>

            <h3>No Guarantees</h3>
            <p>We strive to provide accurate results, but we do not guarantee that every analysis is 100% correct. Use your judgment and consult professionals for serious security decisions.</p>
            
            <h3>Modifications</h3>
            <p>We may update these Terms occasionally. If we make major changes, we’ll post an update on this page. Continued use of the site means you accept the new Terms.</p>

            <h3>Childrens Privacy</h3>
            <p>SafeClick is not intended for users under 13. We do not knowingly collect personal information from children.
            </p>

            <h3>Cookies and Tracking</h3>
            <p>We do not use cookies or third-party trackers at this time.
            </p>

            <h3>Data Retention</h3>
            <p>We do not permanently store URLs or files you submit. Uploaded data is processed temporarily and discarded after analysis.
            </p>

            <h3>Security</h3>
            <p>We use secure communication protocols (HTTPS/TLS) to protect your data. However, no system is completely secure — use at your own risk.
            </p>
            
            <h3>Your Rights</h3>
            <ul>
                <li>
                View what data we have about you
                </li>
                <li>
                Ask us to delete any retained information (if applicable)

                </li>
            </ul>
            <p>To make a request, contact us at contact@safeclick.ai</p>

            <h3>Contact Us</h3>
            <p>f you have any questions about these Terms or our Privacy Policy, reach out anytime:
            📧 contact@safeclick.ai</p>

            <p>By using SafeClick, you acknowledge that you've read and agreed to these Terms and our Privacy Policy. Thanks for using our service safely and responsibly!</p>

        </div>
      
    
    </div>
  );
};

export default Terms;