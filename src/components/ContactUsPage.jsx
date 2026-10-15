import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { Button, Input, SectionHeader } from './common';

export const ContactUsPage = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderNumber: '',
    topic: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const topicOptions = [
    '- SELECT -',
    'MY ACCOUNT',
    'SIZE GUIDE',
    'SHOPPING',
    'PRIVACY',
    'PRESS',
    'CORPORATE',
    'PAYMENTS',
    'SHIPPING',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMessage('First Name and Last Name are required.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email Address is required.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Phone/Mobile number is required.');
      return;
    }
    if (!formData.topic || formData.topic === '- SELECT -' || formData.topic === '- Select -') {
      setErrorMessage('Please select a valid topic.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Your message cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      await api.submitContact(formData);

      setSubmitted(true);
      showToast('Your message has been sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        orderNumber: '',
        topic: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit contact form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
   
        <div className="mb-10">
          <SectionHeader
            title="CONTACT US"
            subtitle="Our atelier specialists are at your service for sizing guidance, order inquiries, and personal tailoring."
          />
        </div>

 
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-8 text-center rounded-none space-y-4 animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-lg font-bold text-emerald-950 uppercase tracking-wider font-serif-luxury">
              MESSAGE SENT SUCCESSFULLY
            </h2>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
              Thank you for reaching out to MONZATO. A customer concierge representative will review your request and get back to you shortly.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setSubmitted(false)}
              >
                SEND ANOTHER MESSAGE
              </Button>
            </div>
          </div>
        ) : (
      
          <form onSubmit={handleSubmit} className="space-y-5">
    
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                uppercase={false}
              />
              <Input
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                uppercase={false}
              />
            </div>

   
            <Input
              label="Email *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              uppercase={false}
            />

      
            <div>
              <label className="block text-[11px] font-bold tracking-[0.12em] text-neutral-800 uppercase mb-1.5">
                Phone/Mobile *
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none text-xs text-neutral-600 font-medium">
                  <span className="text-base leading-none">🇮🇳</span>
                  <span className="text-neutral-400">|</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full pl-14 pr-4 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 transition-colors"
                />
              </div>
            </div>

            {/* Order Number Field */}
            <Input
              label="Order Number (Optional)"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              placeholder="e.g. #ORD-89210"
              uppercase={false}
              className="font-mono"
            />

    
            <div>
              <label className="block text-[11px] font-bold tracking-[0.12em] text-neutral-800 uppercase mb-1.5">
                Topic *
              </label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 transition-colors uppercase tracking-wide cursor-pointer"
              >
                {topicOptions.map((option, idx) => (
                  <option key={idx} value={option === '- SELECT -' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-[0.12em] text-neutral-800 uppercase mb-1.5">
                Your Message *
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 transition-colors resize-y"
              />
            </div>

        
            <div className="pt-4 text-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                icon={Send}
                iconPosition="right"
                className="w-full sm:w-64"
              >
                {loading ? 'SUBMITTING...' : 'SUBMIT'}
              </Button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
